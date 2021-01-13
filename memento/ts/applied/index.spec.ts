import test from 'ava';
import { ToDoList, ToDoListHistory } from './index';

test('I can keep track of a to do list and undo any operations', (t) => {
  const toDos = new ToDoList();
  const history = new ToDoListHistory(toDos);

  history.backup();
  const id = toDos.add("first todo");
  t.deepEqual(history.getMomentos(), [{}]);
  t.deepEqual(toDos.getCurrent(), { [id]: 'first todo'});

  history.backup();
  toDos.update(id, "updated first todo");
  t.deepEqual(history.getMomentos(), [{}, {[id]: 'first todo'}])
  t.deepEqual(toDos.getCurrent(), { [id]: 'updated first todo'});

  history.backup();
  toDos.delete(id);
  t.deepEqual(history.getMomentos(), [{}, {[id]: 'first todo'}, {[id]: 'updated first todo'}]);
  t.deepEqual(toDos.getCurrent(), {});

  history.undo();
  t.deepEqual(history.getMomentos(), [{}, {[id]: 'first todo'}]);
  t.deepEqual(toDos.getCurrent(), { [id]: 'updated first todo'});

  history.undo();
  t.deepEqual(history.getMomentos(), [{}])
  t.deepEqual(toDos.getCurrent(), { [id]: 'first todo'});
});