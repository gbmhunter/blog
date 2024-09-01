import datetime
import yaml

# As per https://github.com/yaml/pyyaml/issues/535
class VerboseSafeDumper(yaml.SafeDumper):
    def ignore_aliases(self, data):
        return True

data = {}
data['name'] = 'Bob'
data['name_copy'] = data['name']
print(yaml.dump(data))

data['date'] = datetime.datetime.now().date()
data['date_copy'] = data['date']
print(yaml.dump(data, Dumper=VerboseSafeDumper))