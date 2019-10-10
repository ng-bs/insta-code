import {
  Rule,
  SchematicContext,
  Tree
} from '@angular-devkit/schematics';


export function runner(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    let content = '# ngBS chatters Rule!';
    tree.create('/ng-file.md', content);
    tree.overwrite('/src/insta-code/index.ts', 'sorry, your code is gone');
    return tree;
  };
}
