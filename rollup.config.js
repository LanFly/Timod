import resolve from 'rollup-plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import multi from 'rollup-plugin-multi-input'

import pkg from './package.json'

export default [
  {
    input: 'src/index.ts',
    output: {
      name: 'Timod',
      file: pkg.browser,
      format: 'umd',
      sourcemap: true
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfigOverride: {
          compilerOptions: { declaration: false, declarationMap: false }
        }
      }),
      babel({
        babelHelpers: 'bundled'
      })
    ]
  },
  {
    input: 'src/**/*.[tj]s',
    output: {
      dir: 'cjs',
      format: 'cjs',
      exports: 'auto',
      sourcemap: true
    },
    plugins: [
      multi(),
      resolve(),
      commonjs(),
      typescript(),
      babel({
        babelHelpers: 'bundled'
      })
    ]
  },
  {
    input: 'src/**/*.[tj]s',
    output: {
      dir: 'esm',
      format: 'es',
      sourcemap: true
    },
    plugins: [
      multi(),
      resolve(),
      commonjs(),
      typescript(),
      babel({
        babelHelpers: 'bundled'
      })
    ],
    external: [/lodash-es/]
  }
]
