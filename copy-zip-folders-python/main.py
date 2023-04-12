import os
import shutil
import zipfile

source_directories = ["C:\\TEST\\A",
                    "C:\\TEST\\B",
                    "C:\\TEST\\C",
                    "C:\\TEST\\D"
                    ]

destination_directory = "C:\\TEST\\Destination\\"

def remove_folders(destination_directory):
    for root, directories, files in os.walk(destination_directory):
        for file in files:
            os.unlink(os.path.join(root, file))
        for directory in directories:
            shutil.rmtree(os.path.join(root, directory))

def zip_folders(destination_directory, zip_filename="result.zip"):
    # Create a new ZIP file with the specified name
    with zipfile.ZipFile(os.path.join(destination_directory, zip_filename), "w") as zip_file:
        # Add all files and subdirectories in the latest directory to the ZIP file
        for root, directories, files in os.walk(destination_directory):
            for file in files:
                file_path = os.path.join(root, file)
                zip_file.write(file_path, os.path.relpath(file_path, destination_directory))

def main():
    
    remove_folders(destination_directory)

    for source_directory in source_directories:
        # Get the list of all directories in the specified directory
        directories = [f.path for f in os.scandir(source_directory) if f.is_dir()]

        # Sort the directories by creation time, with the most recent directory first
        directories.sort(key=lambda x: os.path.getctime(x), reverse=True)

        # Get the path of the most recent directory
        if directories:
            latest_directory = directories[0]

            shutil.copytree(latest_directory, os.path.join(destination_directory, os.path.basename(latest_directory)))

if __name__ == "__main__":
    main()
