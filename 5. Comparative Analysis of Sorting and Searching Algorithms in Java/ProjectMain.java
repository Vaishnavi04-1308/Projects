import java.io.File;
import java.io.FileNotFoundException;
import java.util.LinkedHashMap;
import java.util.Scanner;

public class ProjectMain {
	static int compareCount5=0;
	static int compareCount6=0;
	
	public static void main(String args[]) throws Exception  {
		
		System.out.println("Project for comparing complexities of sorting and searching alogrithms\n"); 
		
		//create scanner object
		Scanner input=new Scanner(System.in);
		
		System.out.println("Enter the path where file is placed"); 
		//Waiting for user to enter path details for the file
		String filepath=input.next();
		
		
		System.out.println("Please enter the number of inputs present in the file to be uploaded"); 
		//Waiting for user to enter number of inputs in the file
		int countData=input.nextInt();
		
		//creating array to store data
		int arrayRef[]=new int[countData];
		int arrayOriginal[]=new int[countData];
		//counter declared for inserting the input into the array
		int count=0;
		
		//changing the data type of the file to File type for reading the path via Scanner
		File file=new File (filepath);
		
		Scanner sc;
		try {
			sc = new Scanner(file);
			int data;
			while (sc.hasNext()) {
				data = sc.nextInt();
				//data is inserted into array
				arrayRef[count]=data;
				arrayOriginal[count]=data;
				count++;
				
		}
		}
		catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			System.out.println("Kindly enter the correct path details for the file ");
			e.printStackTrace();
		}
		
		//printing the data provided in the file in the set of 10 numbers in each line
		System.out.println("\nPrinting the data provided in the file");
		
		for (int i=0;i<arrayRef.length;i++) {
			if (i!=0&&i%10==0){
				System.out.println();		
			}
			System.out.print(" [ " +arrayRef[i] + " ] ");
		}
		

		
		
		String sortName="Simple sort Name";
		System.out.println("\n\nPlease choose the one of corresponding number of the simple sorting techniques for sorting the data provided");
		System.out.println("1. Selection sorting\n2. Insertion sorting\n3. Bubble sorting");
		int simpleSort=input.nextInt();
		
		
		switch(simpleSort) {
		case 1:
			//Selection sorting
			sortName="Selection sorting";
			selectionSort(arrayRef);
			break;
		case 2:
			//Insertion sorting
			sortName="Insertion sorting";
			insertionSort(arrayRef);
			break;
		case 3:
			//Bubble sorting
			sortName="Bubble sorting";
			BubbleSort(arrayRef);
			break;
		default:
			throw new Exception("Please enter the valid number");
		}
		
		System.out.println("\n\nPrinting the sorted data for the values provided in the file");
		System.out.println(sortName);
		
		for (int i=0;i<arrayRef.length;i++) {
			if (i!=0&&i%10==0){
				System.out.println();		
			}
			System.out.print(" [ " +arrayRef[i] + " ] ");
		}

		System.out.println("\n\nPlease choose the one of corresponding number of the better sorting techniques for sorting the data provided");
		System.out.println("1. Merge sorting\n2. Quick sorting\n3. Heap sorting");
		int betterSort=input.nextInt();
		String betterSortName="Sort Name";
		switch(betterSort) {
		case 1:
			//Merge sorting
			betterSortName="Merge sorting";
			int compareCount4=mergeSort(arrayRef,countData);
			System.out.println("\nMerge sorting compare count is " +compareCount4);
			break;
		case 2:
			//Quick sorting
			betterSortName="Quick sorting";
			quickSort(arrayRef,0,arrayRef.length-1);
			System.out.println("\nQuick sorting compare count is "+ compareCount5);
			break;
		case 3:
			//Heap sorting
			betterSortName="Heap sorting";
			HeapSort(arrayRef);
			System.out.println("\nHeap sorting compare count is "+compareCount6);
			break;
		default:
			throw new Exception("Please enter the valid number");
		}		
			
		
		//printing the sorted data for data provided in the file in the set of 10 numbers in each line
		System.out.println("\nPrinting the sorted data for the values provided in the file");
		System.out.println(betterSortName);		
				for (int i=0;i<arrayRef.length;i++) {
					if (i!=0&&i%10==0){
						System.out.println();		
					}
					System.out.print(" [ " +arrayRef[i] + " ] ");
				}
				
		//requesting data to be searched via the linear search method		
		System.out.println("\n\nPlease enter the number to be searched within the array");
		int dataCheck=input.nextInt();
		//calling the linear search method	
		int linearValue=linearSearch(arrayOriginal,dataCheck);
		
		if(linearValue==-1) {
			System.out.println("Array is empty");
		}	
		else if(linearValue==-2) {
			System.out.println("Value is not present in the array");
		}
		else {
			System.out.println("dataCheck is present in "+linearValue+" index of the array");
		}
		
		//Binary search	
		Node root = null;
		//Creating the binary search tree 
		for (int target: arrayRef) {
            root = sortedtoBST(root, target);
        }
		//searching the element via binary search tree 
		Binarysearch(root,dataCheck );
		
		
		//hashing function
		//int hashValue=hashSearch(arrayRef,dataCheck);
		//<Integer>hashSearch((Integer [])arrayRef, Integer.parseInt(dataCheck));
		int hashValue=hashSearch(arrayRef, dataCheck);
		System.out.println("Hashfunction Value for the "+dataCheck+" is "+hashValue);
	}
	
	//Sorting method definitions
			//Selection Sort method   
			static void selectionSort(int arrayRef[]){
				int endIndex=arrayRef.length-1; 
				int compareCount1=0;
				//every iteration least element is moved to top
				for(int current=0;current<endIndex;current++){
					int indexOfMin=current;
					for (int index=current+1;index<=endIndex;index++){
					compareCount1++;	
					if (arrayRef[index]<arrayRef[indexOfMin])
						swap(arrayRef,index,indexOfMin);// minimum value is swapped to the front of the array
						
					}
					
				}
				System.out.println("selection sorting compare count is " +compareCount1);
			}
			
			//swap method for interchanging the positions with the array
			static void swap(int[] arrayRef, int first, int second) {
		        int temp = arrayRef[first];
		        arrayRef[first] = arrayRef[second];
		        arrayRef[second] = temp;
		    }
			
			//Insertion Sort method
			static void insertionSort(int arrayRef[]){
				int size=arrayRef.length;
				int compareCount2=0;
				for (int count=1;count<size;count++)
				compareCount2=compareCount2+insertElement(arrayRef,0, count);
				System.out.println("\ninsertion sorting compare count is " +compareCount2);
			}
			
			//insertElement method is used in insertionSort method
			//insertElement method swaps the least value to the top of the array maintaining the sorted array on one side.
			static int insertElement(int arrayRef[],int startIndex, int endIndex){
				boolean finished = false;
				int current = endIndex;
				boolean moreToSearch = true;
				int currentminusone;
				int compareCount2=0;
				
				while (moreToSearch && !finished)
				{
					currentminusone=current-1;
					compareCount2++;
					if (arrayRef[current] < arrayRef[currentminusone])
					{
					swap(arrayRef,current, currentminusone);
					current--;
					moreToSearch=(current != startIndex);
					}
					else
					finished = true;
				}
				return compareCount2;
			}
			
			//Bubble Sort Method
			static void BubbleSort(int arrayRef[]){
				int current=0;
				int compareCount3=0;
				int sizeMinusOne=arrayRef.length-1;
				
				while (current<arrayRef.length-1){
				compareCount3=compareCount3+bubbleUp(arrayRef,current,sizeMinusOne);
				current++;
				}
				System.out.println("\nBubble sorting compare count is " +compareCount3);
			}
			
			//bubbleUp method is used in BubbleSort method
			//bubbleUp method pushes the least element to the top by making adjacent cell comparison
			static int bubbleUp(int arrayRef[],int startIndex, int endIndex){
				int compareCount3=0;
				for (int index = endIndex; index > startIndex; index--) {
					int indexMinusOne=index -1;
					compareCount3++;
					if (arrayRef[index] < arrayRef[indexMinusOne])
						swap(arrayRef,index, indexMinusOne);
				}
				return compareCount3;
			}
			
			//Merge Sort Method
			static int mergeSort(int arrayRef[], int length){
				//check if the array length is greater than 1 for sorting purpose,if not return since nothing is left to sort
				if(length<=1)
					return -1;
				int compareCount4=0;
				int middle = length/ 2;
				//creating new array for left section of the array
				int leftArray[]=new int[middle]; 
				//creating new array for right section of the array
				int rightArray[]=new int[length-middle]; 
				
				for (int current=0;current<middle;current++){
					//assigning the values of the left side of main array to the new array
					leftArray[current]=arrayRef[current];
				}
				
				for(int current=middle;current<length;current++){
					//assigning the values of the right side of main array to the new array
					rightArray[current-middle]=arrayRef[current];
				}
				
				//employing merge sort to left side of array 
				compareCount4=compareCount4+mergeSort(leftArray,middle);
				//employing merge sort to right side of array
				compareCount4=compareCount4+mergeSort(rightArray,length-middle);
				//sorting the sorted left array and sorted right array 
				compareCount4=compareCount4+Merge(arrayRef,leftArray,rightArray);	
				return compareCount4;
			}
			
			static int Merge(int arrayRef[],int leftArray[],int rightArray[]){
	        int leftArrayLength=leftArray.length;
	        int rightArrayLength=rightArray.length;
	        int i=0,j=0,k=0;
	        int compareCount4=0;
	       
	        
			while(i<leftArrayLength&&j<rightArrayLength){
				//if left array value is less than or equal to right array then shift the value to main array
				if(leftArray[i]<=rightArray[j]){
					compareCount4++;
	                arrayRef[k]=leftArray[i];
	                i++;
	                k++;
	            }
	            else{
				//if right array value is less than left array, then shift the value to main array	
	                arrayRef[k]=rightArray[j];
	                compareCount4++;
	                j++;
	                k++;
	            }
	        }
			
			//if all the right side array is moved to main array but left array still has data to be shifted then moved the rest values to main array
			
			while(i<leftArrayLength){
	            arrayRef[k]=leftArray[i];
	            compareCount4++;
	            i++;
	            k++;
	        }

			//if all the left side array is moved to main array but right array still has data to be shifted then moved the rest values to main array		
	        while(j<rightArrayLength){
	            arrayRef[k]=rightArray[j];
	            compareCount4++;
	            j++;
	            k++;
	        }
	        return compareCount4;
			}
			
			//Quick Sort Method
			static void quickSort(int arrayRef[], int start, int end){ 
				
				if (start < end){  
					        int splitpoint = split(arrayRef, start, end);
					        quickSort(arrayRef, start, splitpoint-1);  
					        quickSort(arrayRef, splitpoint+1, end);  
					    }  
					}
			
			//split method is called within quickSort method
			//This method divides the array into two sections where right side values are greater than split value and left are lesser than spilt value
			static int split (int arrayRef[], int start, int end){  
			    int splitValue = arrayRef[end];   
			    int i = (start - 1); //right side of the split value 
				  
			    for (int j=start;j<= end-1;j++){  
			        // increment smaller index if current element is smaller than the split value 
			    	if (arrayRef[j] < splitValue){  
			        	compareCount5++;
						i++;   
						swap(arrayRef,i,j);
				        }  
				    }  
					swap(arrayRef,i+1,end);
					return (i + 1);  
				}
			//Heap Sort Method
			static void HeapSort(int arrayRef[]){
				//building the max heap from unsorted array(tree view parent node is greater than child node)	
				buildMaxHeap(arrayRef);
				for(int i=arrayRef.length-1;  i>0;  i--){
	            swap(arrayRef, i, 0);
	            heapify(arrayRef, 0, i); 
				}
			}
			
			//buildMaxHeap method builds max heap from unsorted array
			static void buildMaxHeap(int arrayRef[]){
				int arraylength=arrayRef.length;
				for(int i=arraylength/2-1; i>=0; i--){
	            heapify(arrayRef,i,arraylength);
				}
			}
			
			//heapify method builds max heap when part of array is sorted
			static void heapify(int[] arrayRef, int arrayIndex, int arraylength){
							
				if( arrayIndex <0 || arrayIndex>=arraylength)
	            return ;

				int left = 2*arrayIndex+1;
				int right = 2*arrayIndex+2;
				int maxIndex = arrayIndex;

				if(left<arraylength && arrayRef[left] > arrayRef[maxIndex]){
				compareCount6++;	
	            maxIndex = left ;
				}

				if( right <arraylength && arrayRef[right] > arrayRef[maxIndex]){
	            maxIndex = right ;
	            compareCount6++;
				}

				if( maxIndex != arrayIndex){
	            swap(arrayRef, maxIndex, arrayIndex);
	            heapify(arrayRef, maxIndex, arraylength);
				}
			}
			
		//Searching techniques method definitions
		//Linear search method
			static int linearSearch(int arrayRef[],int data){
				int arrayLength=arrayRef.length;
				int arrayValue;
				//validate if array is present
				if (arrayLength==0) {
	            return -1;
				}
				
				for(int i=0;i<arrayLength;i++){
					arrayValue=arrayRef[i];
					if(arrayValue==data)
							return i;
				}
				return -2;
	        }
			
		//Binary search tree 	
			static Node sortedtoBST(Node root, int target)
			    {
			        // if the root is null, create a new node and return it
			        if (root == null) {
			            return new Node(target);
			        }
			 
			        //target is less than the root node
			        if (target < root.data) {
			            root.left = sortedtoBST(root.left, target);
			        }
			 
			        // target is more than the root node
			        else {
			            root.right = sortedtoBST(root.right, target);
			        }
			 
			        return root;
			    }
	
			public static void Binarysearch(Node root, int target){
		        // start with the root node
		        Node curr = root;
		 
		        //parent of the current node
		        Node parent = null;
		 
		        // search for the target
		        while (curr != null && curr.data != target)
		        {
		            //parent to the current node
		            parent = curr;
		 
		            //if the given target is less than the current node, go to the left node
		            if (target < curr.data) {
		                curr = curr.left;
		            }
		            else {
		                curr = curr.right;
		            }
		        }
		 
		        // Data is not present
		        if (curr == null){
		            System.out.println("Data is not present");
		            return;
		        }
		 
		        if (parent == null) {
		            System.out.println(target + " is the root node ");
		        }
		        else if (target < parent.data)
		        {
		            System.out.println("target is present at location "+ parent.data);
		        }
		        else {
		            System.out.println("target is present at location "+ parent.data);
		        }
		    }
			
			public static  int hashSearch(int arrayRef[], int data) {
				
				LinkedHashMap<Integer, Integer> hasfRef = new LinkedHashMap<Integer, Integer>();
				
				for (int i = 0; i < arrayRef.length; i++) {
					hasfRef.put(arrayRef[i], i);
				}
				if(hasfRef.get(data) != null) {
					return hasfRef.get(data); 
				}
				return -1;
				
		}
}

class Node
{
    int data;
    Node left = null;
	Node right = null;
 
    Node(int data) {
        this.data = data;
    }
}



