# Issue of `esModuleInterop` flag

This demo shows why `esModuleInterop` / `allowSyntheticDefaultImports` flag is kind of "contagious":

- `pkg-foo` depends on `lodash.merge`, and enables `esModuleInterop` flag to make it work.
- `pkg-bar` depends on `pkg-foo`, then it also have to enable `esModuleInterop` / `allowSyntheticDefaultImports` / `skipLibCheck` flag to make things work.
- If other projects are depending on `pkg-foo` or `pkg-bar`, they all have to enable `esModuleInterop` / `allowSyntheticDefaultImports` / `skipLibCheck` flag.

Therefore, as a suggestion, it's better not to enable `esModuleInterop` / `allowSyntheticDefaultImports` flag in a library project, so that it will not "spread" the flag to other projects that depend on it.

> However, in a private project, it's still OK to enable them to make importing easier.

## Steps to repro

```bash
# Initialize monorepo
npm install
# build pkg-foo with tsc
npm run build-pkg-foo
# build pkg-bar with tsc
npm run build-pkg-bar
```

Then error occurs:

```bash
../pkg-foo/lib/index.d.ts:2:8 - error TS1259: Module '"..../esmoduleinterop-issue/node_modules/@types/lodash.merge/index"' can only be default-imported using the 'allowSyntheticDefaultImports' flag

2 import merge from 'lodash.merge';
         ~~~~~

  ../../node_modules/@types/lodash.merge/index.d.ts:10:1
    10 export = merge;
       ~~~~~~~~~~~~~~~
    This module is declared with using 'export =', and can only be used with a default import when using the 'allowSyntheticDefaultImports' flag.
```
