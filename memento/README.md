# Momento

This pattern enables keeping track of snapshots of an objects state over time and consequently the ability to undo operations by rolling back to a previous snapshot of the object.

The pattern ensures the state of the "orginator" object remains privagte to the object and encapsulated. The object is responsible for taking snapshots of itself in "momento" objects. The contents of the momento are only accessible to the creator of the momento.

A "caretaker" can access momentos with a limited interface to accesss metadata about the snapshot.