import re

try:
    css = open("style.css", "r")
    cssText = css.read()
    js = open("tomczukToolKitTest.js", "r+", encoding = 'utf-8')
    jsText = js.read()
    result = re.search("customUpdateableCSS\s*\=\s*`([^`]+)`", jsText)
    print(result)
    # newJs = re.sub("customUpdateableCSS", "css", jsText)
    # toSave = open('nowy.js', "w");
    # toSave.write(newJs)
except BaseException as err:
    print("Wystąpił błąd.")
    print(err)
finally:
    css.close()
    js.close()