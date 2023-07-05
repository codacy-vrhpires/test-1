package foo.testingPackage


object Xpto {


    def testFunc(a: Int = 12): Int = {
        logger.info("test")
        a + 1
    }

    private[testingPackage] def testFuncPrivate() { // private function valid within package "testingPackage"

    }

    def log: Unit = {  // print string and returns Unit or () representing void
        println("asdasds")
    }

}