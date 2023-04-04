import time

tasks = {}

def start_task(task_name):
    tasks[task_name] = time.time()

def end_task(task_name):
    start_time = tasks.get(task_name)
    if start_time:
        end_time = time.time()
        duration = end_time - start_time
        print(f"{task_name} took {duration:.2f} seconds to complete.")
    else:
        print(f"{task_name} was not started.")

while True:
    command = input("Enter a command (start/end/exit): ")
    if command == "start":
        task_name = input("Enter task name: ")
        start_task(task_name)
    elif command == "end":
        task_name = input("Enter task name: ")
        end_task(task_name)
    elif command == "exit":
        break
    else:
        print("Invalid command.")