import {
  Rule,
  SchematicContext,
  Tree,
  externalSchematic,
  chain
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';

// Requirements:
// Generate a component API interface
// [x] should be based upon the default component schematic
// [x] should be inside [path]/[component].component.ts
// [x] should be named [componentName]Api
// [ ] should be implemented by the component class


export function runner(options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    const collectionName = '@schematics/angular';
    const schematicName = 'component';
    return chain([
      externalSchematic(collectionName, schematicName, options),
      addInterface(options)
    ]);

  };
}

function addInterface(options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    // find
    const path = `${options.path}/${options.name}/${options.name}.component.ts`;

    // read
    let contents = getContents(tree, path);
    if (contents === null) {
      return;
    }

    // edit
    const className = strings.classify(options.name) + 'Component';
    const interfaceName = `${className}Api`
    const insertText = `export interface ${interfaceName} {}\n\n@Component`;
    contents = contents.replace(/@Component/, insertText);

    contents = contents.replace(/implements/, `implements ${interfaceName}, `);

    // write
    tree.overwrite(path, contents);

    return tree;
  }
}

/*
ng g insta-code:hutch --name=foo --project=rabbit-hole
schematics .
*/

function getContents(tree: Tree, path: string): string | null {
  let contents = null;
  const data = tree.read(path);
  if (data !== null) {
    contents = data.toString();
  }
  return contents;
}