int readFileLineByLine(String filePath) {
    File file = new File(filePath)
    def line, noOfLines = 0;
    file.withReader { reader ->
        while ((line = reader.readLine()) != null) {
            println "${line}"
            noOfLines++
        }
    }
    return noOfLines
}

def 'Should return number of lines in File using ReadFile.readFileLineByLine given filePath' () {
    given:
        def filePath = "fileContent.txt"
    when:
        def noOfLines = readFile.readFileLineByLine(filePath)
    then:
        noOfLines
        noOfLines instanceof Integer
        assert noOfLines, 3
}
