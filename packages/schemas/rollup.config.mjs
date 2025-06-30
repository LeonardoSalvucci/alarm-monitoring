import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: [
      'src/index.ts',
      'src/user.ts',
      'src/auth.ts',
      'src/subscriber.ts',
      'src/central-station.ts'
    ],
    output: [
      { dir: 'dist/esm', format: 'esm', entryFileNames: '[name].js', preserveModules: true },
      { dir: 'dist/cjs', format: 'cjs', entryFileNames: '[name].cjs', preserveModules: true }
    ],
    plugins: [
      resolve(), 
      commonjs(), 
      typescript({ tsconfig: './tsconfig.build.json', declaration: false, emitDeclarationOnly: false, outDir: undefined})],
    external: ['zod']
  }
];