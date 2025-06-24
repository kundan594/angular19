Here’s the difference and where to use each:

Use typeof for primitive types (string, number, boolean, symbol, bigint, undefined, function, object). Example: typeof value === 'string'
Use instanceof for class instances or objects created with constructors (including built-in types like Array, Date, custom classes, etc.). Example: value instanceof MyClass
In your file, instanceof is used to check if an event is an instance of a specific Angular Router event class (e.g., NavigationStart). This is correct, because those are class instances, not primitives.

Summary:

Use typeof for primitives.
Use instanceof for class/constructor instances.