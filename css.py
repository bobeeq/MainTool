import re

mainFileName = "tomczukToolKit.js"
try:
    css = open("style.css", "r")
    cssText = css.read()
    js = open(mainFileName, "r+", encoding = 'utf-8')
    jsText = js.read()
    newJs = re.sub(r"(customUpdateableCSS\s*\=\s*`)([^`]+)(`)", r"\1\2\3", jsText)
    toSave = open('nowy.js', "w");
    toSave.write(newJs)
except BaseException as err:
    print("Wystąpił błąd.")
    print(err)
finally:
    css.close()
    js.close()
    print('Plik ' + mainFileName + ' został podmieniony.')