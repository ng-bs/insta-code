import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as path from 'path';


const collectionPath = path.join(__dirname, '../collection.json');


describe('hutch', () => {
  let startTree: UnitTestTree;
  let runner: SchematicTestRunner

  beforeEach(async () => {
    runner = new SchematicTestRunner('asewra', collectionPath);
    startTree = await runner.runExternalSchematicAsync(
      '@schematics/angular',
      'ng-new',
      {
        name: 'rabbit-hole',
        version: '11.0.0',
        directory: '.'
      },
      Tree.empty()
    ).toPromise();
  });

  it('works', async () => {
    const options = {
      name: 'ngbs',
      path: '/src/app',
      project: 'rabbit-hole'
    };
    const startingFileCount = startTree.files.length;
    const tree$ = runner.runSchematicAsync('hutch', options, startTree);

    const tree = await tree$.toPromise();
    expect(tree.files.length - startingFileCount).toEqual(4);

    const content = tree.readContent('/src/app/ngbs/ngbs.component.ts');
    expect(content).toMatch(/export interface NgbsComponentApi/);
    expect(content).toMatch(/implements NgbsComponentApi,/);
    console.log(content);
  });
});
