import json
import os





def save_data(data, filename='/home/josh/Documents/Code/Personal-Projects/Python/Desirability/Data/dataset.json'):
    with open(filename,'r+') as file:
          # First we load existing data into a dict.
        file_data = json.load(file)
        # Join new_data with file_data inside emp_details
        file_data["datasets"].append(data)
        # Sets file's current position at offset.
        file.seek(0)
        # convert back to json.
        json.dump(file_data, file, indent = 4)
