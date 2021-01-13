import test from 'ava';
import { Singleton } from './index';

test('An error is thrown if a second instance of Singleton is attempted to be created', (t) => {
  t.is(Singleton.Instance.log(), 'private');
})