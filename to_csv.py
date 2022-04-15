import pandas as pd

true = True
false = False


def convert_file(file_range=6):
    for i in range(1, file_range + 1):
        file = open(str(i) + '.txt', 'r')
        csv_dict = {'to': [], 'from': [], 'function': [], 'time': [],
                    'params': [], 'blockNumber': [], 'type': [],
                    'value': [], 'gasPrice': [], 'gasUsed': []}
        lines = file.readlines()[1:]
        for line in lines:
            if line:
                obj = eval(str(line))
                csv_dict['to'].append(obj['to'])
                csv_dict['from'].append(obj['from'])
                csv_dict['function'].append(obj['name'])
                csv_dict['time'].append(obj['time'])
                csv_dict['blockNumber'].append(obj['blockNumber'])
                csv_dict['type'].append(obj['type'])
                #
                csv_dict['value'].append(obj['value'])
                csv_dict['gasPrice'].append(obj['gasPrice'])
                csv_dict['gasUsed'].append(obj['gasUsed'])
                csv_dict['params'].append(obj['params'])
        file.close()
        df = pd.DataFrame(csv_dict)
        df.to_csv('./' + str(i) + '.csv')


convert_file()

"""
except Exception as e:
    for c in range(0, len(line)):
        if line[c] == 't':
            if line[c:c+4] == 'true':
                line = line[:c] + 'T' + line[c+1:]
        elif line[c] == 'f':
            if line[c:c+5] == 'false':
                line = line[:c] + 'F' + line[c+1:]
    obj = eval(str(line))
    csv_dict['to'].append(obj['to'])
    csv_dict['from'].append(obj['from'])
    csv_dict['function'].append(obj['name'])
    csv_dict['blockNumber'].append(obj['blockNumber'])
    csv_dict['type'].append(obj['type'])
    #
    csv_dict['value'].append(obj['value'])
    csv_dict['gasPrice'].append(obj['gasPrice'])
    csv_dict['params'].append(obj['params'])
"""
