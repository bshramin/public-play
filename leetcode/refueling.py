

class NestedIterator:
    stack = []
    # Initializes the NestedIterator with nested_list

    def __init__(self, nested_list):
        self.stack = nested_list
        self.stack.reverse()

    # checks if there are still some integers in nested_list
    def has_next(self):
        return len(self.stack) > 0

    # returns the next element from nested_list
    def next(self):
        item = self.stack.pop()
        if isinstance(item, int):
            return item
        elif isinstance(item, list):
            item.reverse()
            last = item.pop()
            for val in item:
                self.stack.append(val)
            return last
        else:
            print(item)
            raise Exception()


# ------ Please don't change the following function ----------
# flatten_list function is used for testing porpuses.
# Your code will be tested using this function
def flatten_list(nested_iterator_object):
    result = []
    while nested_iterator_object.has_next():
        result.append(nested_iterator_object.next())
    return result


NestedIntegers = [1, 2, [3, [4, 5, 6], [7, 8], 9], 10]

print(flatten_list(NestedIterator(NestedIntegers)))
