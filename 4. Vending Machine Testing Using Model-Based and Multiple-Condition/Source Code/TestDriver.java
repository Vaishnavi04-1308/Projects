import java.util.Scanner;

class TestDriver {
    public static void main(String[] args) {
        /* Displaying the required contents */
        System.out.println("\nCS 589 FALL 2023 PROJECT");
        System.out.println("Vending Machine Menu");

        /* Method Menu is called to display the Menu options in Vending Machine */
        Menu();
        System.out.println("Kindly select one of the options from the Menu");
        /* Object creation of VendingMachine class,
         this will set the initial values which is provided by constructor of the class */
        VendingMachine vm = new VendingMachine();

        /* creating scanner object */
        Scanner sc = new Scanner(System.in);
        String UserInput = sc.nextLine();

        /* variable to store return value of each method */
        int ValueReturned=1;


        /* while loop with the condition to exit when quit is opted from the menu */
        while(!UserInput.equals('q')){

            /* switch case condition to process further on the basics of menu opted */
            switch (UserInput) {
                case "0":
                    System.out.println("Coin() Method");
                    ValueReturned = vm.Coin();             
                    System.out.println("The value returned by the method is: " + ValueReturned);
                    System.out.println("\nEnter the next option");
                    Menu();
                    break;

                case "1":
                    System.out.println("SmallCup() Method");
                    ValueReturned = vm.SmallCup();
                    System.out.println("The value returned by the method is: " + ValueReturned);
                    System.out.println("\nEnter the next option");
                    Menu();
                    break;

                case "2":
                    System.out.println("LargeCup() Method");
                    ValueReturned = vm.LargeCup();
                    System.out.println("The value returned by the method is: " + ValueReturned);
                    System.out.println("\nEnter the next option");
                    Menu();
                    break;

                case "3":
                    System.out.println("Sugar() Method");
                    ValueReturned = vm.Sugar();
                    System.out.println("The value returned by the method is: " + ValueReturned);
                    System.out.println("\nEnter the next option");
                    Menu();
                    break;

                case "4":
                    System.out.println("Coffee() Method");
                    ValueReturned = vm.Coffee();
                    System.out.println("The value returned by the method is: " + ValueReturned);
                    System.out.println("\nEnter the next option");
                    Menu();
                    break;

                case "5":
                    System.out.println("InsertLargeCups(int n) Method");
                    System.out.println("Enter the value of parameter n, i.e Number of Large cups required");
                    int l= sc.nextInt();
                    ValueReturned = vm.InsertLargeCups(l);
                    System.out.println("The value returned by the method is: " + ValueReturned);
                    System.out.println("\nEnter the next option");
                    Menu();
                    break;

                case "6":
                    System.out.println("InsertSmallCups(int n) Method");
                    System.out.println("Enter the value of parameter n, i.e Number of small cups required");
                    int s= sc.nextInt();
                    ValueReturned = vm.InsertSmallCups(s);
                    System.out.println("The value returned by the method is: " + ValueReturned);
                    System.out.println("\nEnter the next option");
                    Menu();
                    break;

                case "7":
                    System.out.println("SetPrice(int p) Method");
                    System.out.println("Enter the value of parameter p, i.e Price value");
                    int p= sc.nextInt();
                    ValueReturned = vm.SetPrice(p);
                    System.out.println("The value returned by the method is: " + ValueReturned);
                    System.out.println("\nEnter the next option");
                    Menu();
                    break;

                case "8":
                    System.out.println("Cancel() Method");
                    ValueReturned = vm.Cancel();
                    System.out.println("The value returned by the method is: " + ValueReturned);
                    System.out.println("\nEnter the next option");
                    Menu();
                    break;

                case "9":
                    System.out.println("Dispose() Method");
                    ValueReturned = vm.Dispose();
                    if (ValueReturned==1) {
                        System.out.println("The value returned by the method is: " + ValueReturned);
                        System.exit(0);
                    }
                    System.out.println("The value returned by the method is: " + ValueReturned);
                    if (ValueReturned==0){
                        System.out.println("\nEnter the next option");
                        Menu();
                    }
                    break;

                case "a":
                    System.out.println("Show_variables() Method");
                    vm.Show_variables();
                    System.out.println("\nEnter the next option");
                    Menu();
                    break;
                case "b":
                    System.out.println("State : ");
                    vm.currentState();
                    System.out.println("\nEnter the next option");
                    Menu();
                    break;
                case "q":
                    System.out.println("Exited successfully");
                    System.exit(0);
                    break;

                default:
                	System.out.println("\nEnter the next option");
                    break;

            }
            /* Taking the user input */
            UserInput = sc.nextLine();
        }


    }

    /* Menu method to print the vending machine menu along with testing related methods*/
    public static void Menu(){
        System.out.println("0. Coins()");
        System.out.println("1. SmallCup()");
        System.out.println("2. LargeCup()");
        System.out.println("3. Sugar()");
        System.out.println("4. Coffee()");
        System.out.println("5. InsertLargeCups(int n)");
        System.out.println("6. InsertSmallCups(int n)");
        System.out.println("7. SetPrice(int p)");
        System.out.println("8. Cancel()");
        System.out.println("9. Dispose()");
        System.out.println("\nTesting-related methods");
        System.out.println("a. Show_variables");
        System.out.println("b. Current_State");
        System.out.println("q. Quit Vending Machine class driver\n");

    }


}
