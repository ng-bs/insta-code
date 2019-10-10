import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';


const collectionPath = path.join(__dirname, '../collection.json');


describe('insta-code', () => {
  it('works', () => {
    const runner = new SchematicTestRunner('asewra', collectionPath);
    const tree = runner.runSchematic('insta-code', {}, Tree.empty());

    expect(tree.files.length).toEqual(1);
    const path = '/ng/bs/ngbs.md';
    expect(tree.files[0]).toEqual(path);
    const fileContents = tree.readContent(path);
    expect(fileContents).toEqual('# ngBS chatters Rule!');
  });
});
