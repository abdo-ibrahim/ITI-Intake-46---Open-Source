def add(a, b):
  return a + b

def subtract(a, b):
  return a - b

def multiply(a, b):
  return a * b

def division(a, b):
  try:
    return a / b
  except ZeroDivisionError:
    return "Cannot divide by zero"
