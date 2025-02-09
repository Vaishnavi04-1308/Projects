public class VendingMachine {
    private int x;
    private int w;
    private int k1;
    private int k;
    private int t;
    private int s;

    public VendingMachine() {
        k = 0;
        k1 = 0;
        t = 0;
        w = 0;
        x = 1;
    }

    public int Coin() {
        if (x == 1) {
            if ((t + 25 >= w) && (w > 0)) {
                s = 0;
                t = 0;
                x = 2;
                return 1;
            } else if (t + 25 < w) {
                t = t + 25;
                return 1;
            }
        } else if ((x > 1) && (x < 6)) {
            System.out.println("RETURN COIN");
            return 1;
        }
        return 0;
    }

    public int SmallCup() {
        if ((x == 2) || (x == 3)) {
            s = 2;
            return 1;
        }
        return 0;
    }

    public int LargeCup() {
        if ((x == 2) || (x == 3)) {
            s = 1;
            return 1;
        }
        return 0;
    }

    public int Sugar() {
	if ((x==2)||(x==3)) {
		if(x==2) x=3;
		else x=2;
		return 1;
	}
	return 0;
    }


  public int Coffee() {
        if ((x == 2) || (x == 3)) {
            if ((x == 2) && (k > 1) && (s == 2)) {
                System.out.println("DISPOSE SMALL CUP OF COFFEE");
                k = k - 1;
                x = 1;
                return 1;
            } else if ((x == 2) && (k1 > 1) && (s == 1)) {
                System.out.println("DISPOSE LARGE CUP OF COFFEE");
                k1 = k1 - 1;
                x = 1;
                return 1;
            } else if ((x == 2) && (k1 == 1) && (s == 1)) {
                System.out.println("DISPOSE LARGE CUP OF COFFEE");
                k1 = k1 - 1;
                x = 5;
                return 1;
            } else if ((x == 2) && (k == 1) && (s == 2)) {
                System.out.println("DISPOSE SMALL CUP OF COFFEE");
                k = k - 1;
                x = 4;
                return 1;
            } else if ((x == 3) && (k == 1) && (s == 2)) {
                System.out.println("DISPOSE SMALL CUP OF COFFEE WITH SUGAR");
                k = k - 1;
                x = 4;
                return 1;
            } else if ((x == 3) && (k1 == 1) && (s == 1)) {
                System.out.println("DISPOSE LARGE CUP OF COFFEE WITH SUGAR");
                k1 = k1 - 1;
                x = 5;
                return 1;
            }
            if ((x == 3) && (k > 1) && (s == 2)) {
                System.out.println("DISPOSE SMALL CUP OF COFFEE WITH SUGAR");
                k = k - 1;
                x = 1;
                return 1;
            } else if ((x == 3) && (k1 > 1) && (s == 1)) {
                System.out.println("DISPOSE LARGE CUP OF COFFEE WITH SUGAR");
                k1 = k1 - 1;
                x = 1;
                return 1;
            }
            return 0;
        }
        return 0;
    }

   public int InsertLargeCups(int n) {
        if ((x == 1) && (n > 0)) {
            k1 = k1 + n;
            return 1;
        } else if ((x == 5) && (n > 0)) {
            k1 = n;
            x = 1;
            return 1;
        }
        return 0;
    }

    public int InsertSmallCups(int n) {
        if ((x == 1) && (n > 0)) {
            k = k + n;
            return 1;
        } else if ((x == 4) && (n > 0)) {
            k = n;
            x = 1;
            return 1;
        }
        return 0;
    }

    public int SetPrice(int p) {
        if ((x == 1) && (p > 0)) {
            w = p;
            return 1;
        }
        return 0;
    }

    public int Cancel() {
        if ((x == 2) || (x == 3)) {
            System.out.println("RETURN COINS");
            x = 1;
            return 1;
        }
        return 0;
    }

    public int Dispose() {
        if ((x == 1)) {
            System.out.println("SHUT DOWN");
            x = 6;
            return 1;
        }
        return 0;
    }

    /* Testing-oriented method */
    /* This method prints the current value of all private variables */
    public void Show_variables(){
        System.out.println
                ("x = " + x + ", w = " + w +
                ", k1 = " + k1 + ", k = " + k +
                ", t = " + t + ", s = " + s);
    }
    /* This method prints the current state  */
    public void currentState(){
        switch(this.x){
            case 1:
                System.out.println("idle");
                break;
            case 2:
                System.out.println("coins inserted");
                break;
            case 3:
                System.out.println("sugar");
                break;
            case 4:
                System.out.println("no small cups");
                break;
            case 5:
                System.out.println("no large_cups");
                break;
            case 6:
                System.out.println("Process Ended, cup disposed,Terminates the operation of Vending Machine");
                break;
            default:
                break;
        }
    }

}
