import unittest
from analyzer import analyze_code

class TestAnalyzer(unittest.TestCase):
    def test_simple_loop(self):
        code = """
def foo(n):
    for i in range(n):
        print(i)
"""
        result = analyze_code(code)
        self.assertEqual(result['metrics']['loop_count'], 1)
        self.assertEqual(result['complexity'], "O(n)")

    def test_nested_loop(self):
        code = """
def foo(n):
    for i in range(n):
        for j in range(n):
             print(i, j)
"""
        result = analyze_code(code)
        self.assertEqual(result['metrics']['loop_count'], 2)
        # Depth might be 2 loops + checks?
        # Analyzer logic: max_depth counts all nodes (func, for, if).
        # max_nesting visitor counts only loops.
        # My logic uses max_nesting for O(n^k).
        self.assertIn("O(n²)", result['complexity'])

if __name__ == '__main__':
    unittest.main()
