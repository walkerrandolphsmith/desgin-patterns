import test from 'ava';
import { Origniator, Caretaker } from './index';

test('snapshots of state can be rolled back to using an undo operation', (t) => {
  const originalValue = 0;
  const newValue = 10;

  const origniator = new Origniator(originalValue);
  const caretaker = new Caretaker(origniator);
  caretaker.backup();
  origniator.mutateState(newValue);

  t.is(origniator.state, newValue);
  t.is(caretaker.getHistory().length, 1);
  
  caretaker.undo();
  t.is(origniator.state, originalValue);
  t.is(caretaker.getHistory().length, 0);
})