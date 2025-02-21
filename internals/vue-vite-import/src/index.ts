import * as changeCase from 'change-case'
import type { Plugin } from 'vite'

type ChangeCaseType =
  | 'camelCase'
  | 'capitalCase'
  | 'constantCase'
  | 'dotCase'
  | 'headerCase'
  | 'noCase'
  | 'paramCase'
  | 'pascalCase'
  | 'pathCase'
  | 'sentenceCase'
  | 'snakeCase'

interface PluginInnerOption {
  libraryName: string
  libraryResolve: (name: string) => string
  customName?: (name: string) => string
}

type PluginInnerOptions = Array<PluginInnerOption>

export interface PluginOption {
  libraryName: string
  libraryDirectory?: string
  split?: string
  customName?: (name: string) => string
  libraryChangeCase?: ChangeCaseType | ((name: string) => string)
}

export type PluginOptions = Array<PluginOption>

type ModeType = 'pc' | 'mobile' | undefined

export default function vitePluginBabelImport(
  plgOptions: PluginOptions,
  mode: ModeType
): Plugin {
  return {
    name: '@opentiny/vue-vite-import',
    transform(code, id) {
      const matchValue = mode === 'pc' ? './mobile' : './pc'
      const isCheckMode = mode && /@opentiny\/vue-.+?\/lib\/index.js$/.test(id)
      // 不处理node_modules内的依赖
      if (/\.(?:[jt]sx?|vue)$/.test(id) && !/(node_modules)/.test(id)) {
        return {
          code: transformCode(
            code,
            transformOptions(plgOptions)
          ),
          map: null
        }
      } else if (isCheckMode) {
        const newCode = code.replace(matchValue, `./${mode}`)
        return {
          code: newCode,
          map: null
        }
      }
    }
  }
}

interface CaseFnObjType {
  libraryCaseFn: (name: string) => string
  styleCaseFn: (name: string) => string
}

function generateOptions(caseFnObj: CaseFnObjType, opt: PluginOption) {
  if (typeof opt.libraryChangeCase === 'function') {
    caseFnObj.libraryCaseFn = opt.libraryChangeCase
  } else {
    caseFnObj.libraryCaseFn = (name) => {
      return changeCase[
        (opt.libraryChangeCase || 'paramCase') as ChangeCaseType
      ](name)
    }
  }
}

function transformOptions(options: PluginOptions): PluginInnerOptions {
  return options.map((opt) => {
    const caseFnObj: CaseFnObjType = {
      libraryCaseFn: (name: string) => {
        return name
      },
      styleCaseFn: (name: string) => {
        return name
      }
    }

    generateOptions(caseFnObj, opt)

    return {
      libraryName: opt.libraryName,
      customName: (name) => {
        return opt?.customName?.(caseFnObj.libraryCaseFn(name))
      },
      libraryResolve: (name) => {
        let libraryPaths: string[] = [opt.libraryName]
        if (opt.libraryDirectory) {
          libraryPaths.push(opt.libraryDirectory)
        }
        libraryPaths.push(caseFnObj.libraryCaseFn(name))
        return libraryPaths.join(opt.split || '-').replace(/\/\//g, '/')
      }
    } as PluginInnerOption
  })
}

const transformImport = (matchRes: string, opt: PluginInnerOption) => {
  const componentsArr = matchRes.split(',').filter(item => item.trim()).map(item => {
    let itemName = item.trim()
    let asName = ''

    // 处理import { Alert as TinyAlert } from '@opentiny/vue'
    const isImportWithAs = itemName.includes(' as ')
    if (isImportWithAs) {
      const allName = itemName.split(' as ')
      itemName = allName[0]
      asName = allName[1]
    }
    const importName = opt.customName?.(itemName) || opt.libraryResolve(itemName)
    const compImportName = isImportWithAs ? `* as ${asName}` : itemName
    return `import ${compImportName} from '${importName}'`
  })
  return componentsArr.join('\n') + '\n'
}

const compRegExpMap = {
  '@opentiny/vue': /import\s+?{([\w ,\s]+)}\s+?from\s+?('|")@opentiny\/vue('|")/g,
  '@opentiny/vue-icon':
    /import\s+?{([\w ,\s]+)}\s+?from\s+?('|")@opentiny\/vue-icon('|")/g
}

function transformCode(
  code: string,
  plgOptions: PluginInnerOptions
): string {
  let resultCode = code

  plgOptions.forEach(opt => {
    const compRegexp = compRegExpMap[(opt.libraryName as '@opentiny/vue')]
    if (compRegexp && compRegexp.test(resultCode)) {
      const newCode = resultCode.replace(compRegexp, (_all, matchRes): string => {
        const newImport = transformImport(matchRes, opt)
        return newImport
      })
      resultCode = newCode
    }
  })

  return resultCode
}
