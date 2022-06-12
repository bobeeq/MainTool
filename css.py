import re
import shutil

mainFileName = "tomczukToolKit.js"
try:
    shutil.copyfile('tomczukToolKit.js', mainFileName)
    cssFile = open("style.css", "r", encoding = 'utf-8')
    cssText = cssFile.read()

    jsFile = open(mainFileName, "r", encoding = 'utf-8')
    jsText = jsFile.read()
    jsFile.close()

    bakFile = open(mainFileName + '.bak', 'w', encoding = 'utf-8')
    bakFile.write(jsText)
    print('Backup utworzony: ' + mainFileName + '.bak')
    
    newJs = re.sub(
        r"(customUpdateableCSS\s*\=\s*`)([^`]+)(`)",
        r"\1" + cssText + r"\3",
        jsText
    )
    jsFile = open(mainFileName, 'w', encoding = 'utf-8')
    jsFile.write(newJs)
except BaseException as err:
    print("Wystąpił błąd.")
    print(err)
finally:
    cssFile.close()
    jsFile.close()
    print('Plik ' + mainFileName + ' został podmieniony.')