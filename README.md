# TypeORM unnoficial CLI Wrapper

This is a wrapper for [TypeORM CLI](https://github.com/typeorm/typeorm/blob/master/docs/using-cli.md), which execute the original CLI, using [ts-node](https://www.npmjs.com/package/ts-node) and [ts-path-mapping](https://www.npmjs.com/package/ts-path-mapping) as __required__ dependencies.

## Implementation

First you must have a project with [typescript](https://www.npmjs.com/package/typescript), [typeorm](https://www.npmjs.com/package/typeorm) and its corresponding `ormconfig.json` file. Then, install [ts-node](https://www.npmjs.com/package/ts-node):

```npm
npm i --save-dev ts-node
```

Optionally, if you want to use custom path alias, you can add [ts-path-mapping](https://www.npmjs.com/package/ts-path-mapping) too:
```npm
npm i --save ts-path-mapping
```
finally, install this package locally...
```npm
npm i --save-dev @faaip-de-oiad/typeorm-cli
```
...or global if you want:
```npm
npm i --g @faaip-de-oiad/typeorm-cli
```

## Usage

If you was installed the package as local development dependency, simply type:
```npm
npx typeorm-cli ...commands
```
...or if you was installed this package globally:
```npm
typeorm-cli ...commands
```
Replace `...commands` with any command from typeorm. For example:
```npm
typeorm-cli migration:generate -n Create-DB
```