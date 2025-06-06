import requests
import tarfile
import csv
from airflow.models import DAG
from airflow.operators.python import PythonOperator
from datetime import timedelta
from airflow.utils.dates import days_ago


url = "https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBM-DB0250EN-SkillsNetwork/labs/Final%20Assignment/tolldata.tgz"
input_file_download="/home/project/airflow/dags/python_etl/staging/tolldata.tgz"
untar_file_path="/home/project/airflow/dags/python_etl/staging"
vehicle_data="/home/project/airflow/dags/python_etl/staging/vehicle-data.csv"
csv_data="/home/project/airflow/dags/python_etl/staging/csv_data.csv"
tollplaza_data="/home/project/airflow/dags/python_etl/staging/tollplaza-data.tsv"
tsv_data="/home/project/airflow/dags/python_etl/staging/tsv_data.csv"
payment_data="/home/project/airflow/dags/python_etl/staging/payment-data.txt"
fixed_width_data="/home/project/airflow/dags/python_etl/staging/fixed_width_data.csv"
extracted_data="/home/project/airflow/dags/python_etl/staging/extracted_data.csv"
transform_data="/home/project/airflow/dags/python_etl/staging/transform_data.csv"

default_args = {
    'owner':'Vaishnavi',
    'start_date':days_ago(0),
    'email':['vaishnavishetty5991@gmail.com'],
    'retries': 1,
    'retry_delay':timedelta(minutes=5)
}

dag = DAG(
    dag_id='ETL_toll_data',
    default_args=default_args,
    description='Apache Airflow Final Assignment',
    schedule_interval=timedelta(days=1),
)



def download_file(url):
    # Send a GET request to the URL
    with requests.get(url, stream=True) as response:
        if response.status_code==200:
            # Open a local file in binary write mode
            with open(input_file_download, 'wb') as file:
                # Write the content to the local file in chunks
                for chunk in response.iter_content(chunk_size=8192):
                    file.write(chunk)
            print(f"File downloaded successfully: {input_file_download}")
        else:
            print(f"Download failed with status code: {response.status_code}")

def untar_dataset(input_file_download,untar_file_path):
    try:
        with tarfile.open(input_file_download, "r:gz") as tar:
            tar.extractall(path=untar_file_path)
        print(f"File extracted successfully to location {untar_file_path}")
    except Exception as e:
        print(f"Error during tar file extraction: {e}")   

def extract_data_from_csv(vehicle_data,csv_data):
    try:
        with open(vehicle_data,"r") as infile, open(csv_data,"w",newline="") as outfile:
            reader=csv.reader(infile)
            writer=csv.writer(outfile)
            
            for row in reader:
                writer.writerow(row[:4]) #reads only first 4 fields
                
        print(f"Extracting data from vehicle-data.csv complete, filename:{csv_data}")
    except Exception as e:
        print(f"Error during extracting data from {vehicle_data}: {e}")

def extract_data_from_tsv(tollplaza_data,tsv_data):
    try:
        with open(tollplaza_data,"r") as infile, open(tsv_data,"w",newline="") as outfile:
            reader=csv.reader(infile, delimiter='\t')
            writer=csv.writer(outfile)
            
            for row in reader:
                writer.writerow(row[4:]) #writes only last 3 remaining fields from index 4
                
        print(f"Extracting data from {tollplaza_data} complete, filename:{tsv_data}")
    except Exception as e:
        print(f"Error during extracting data from {tollplaza_data}: {e}") 

def extract_data_from_fixed_width(payment_data,fixed_width_data):
    try:
        with open(payment_data,"r") as infile, open(fixed_width_data,"w",newline="") as outfile:

            writer=csv.writer(outfile)
            
            for row in infile:
                fields= row.strip().split()
                if(len(fields)>2):
                    writer.writerow(fields[-2:]) #writes only last 2 fields
                
        print(f"Extracting data from {payment_data} complete, filename:{fixed_width_data}")
    except Exception as e:
        print(f"Error during extracting data from {payment_data}: {e}") 

def consolidate_data(csv_data,tsv_data,fixed_width_data,extracted_data):
    try:
        with open(csv_data,"r") as infile1,\
open(tsv_data,"r") as infile2, \
open(fixed_width_data,"r") as infile3, \
open(extracted_data,"w",newline="") as outfile:

            writer=csv.writer(outfile)
            reader1=csv.reader(infile1)
            reader2=csv.reader(infile2)
            reader3=csv.reader(infile3)

            for row1, row2, row3 in zip(reader1,reader2,reader3):
                writer.writerow(row1+row2+row3)

        print(f"Consolidating data completed successfully, filename:{extracted_data}")
    except Exception as e:
        print(f"Error during consolidating data: {e}") 


def transforming_data(extracted_data,transform_data):
    try:
        with open(extracted_data,"r") as infile, open(transform_data,"w",newline="") as outfile:
            reader=csv.reader(infile)
            writer=csv.writer(outfile)
            
            for row in reader:
                field3=row[3].upper()
                writer.writerow(row[:3]+[field3]+row[4:]) 
                
        print(f"Transforming data from {extracted_data} complete, filename:{transform_data}")
    except Exception as e:
        print(f"Error during transforming data from {extracted_data}: {e}") 


download_dataset = PythonOperator(
    task_id='download_dataset',
    python_callable=download_file,
    op_args=[url],
    dag=dag,
)

untar_dataset = PythonOperator(
    task_id='untar_dataset',
    python_callable=untar_dataset,
    op_args=[input_file_download, untar_file_path],
    dag=dag,
)

extract_data_from_csv = PythonOperator(
    task_id='extract_data_from_csv',
    python_callable=extract_data_from_csv,
    op_args=[vehicle_data,csv_data],
    dag=dag,
)

extract_data_from_tsv = PythonOperator(
    task_id='extract_data_from_tsv',
    python_callable=extract_data_from_tsv,
    op_args=[tollplaza_data,tsv_data],
    dag=dag,
)

extract_data_from_fixed_width = PythonOperator(
    task_id='extract_data_from_fixed_width',
    python_callable=extract_data_from_fixed_width,
    op_args=[payment_data,fixed_width_data],
    dag=dag,
)

consolidate_data = PythonOperator(
    task_id='consolidate_data',
    python_callable=consolidate_data,
    op_args=[csv_data,tsv_data,fixed_width_data,extracted_data],
    dag=dag,
)

transform_data = PythonOperator(
    task_id='transform_data',
    python_callable=transforming_data,
    op_args=[extracted_data,transform_data],
    dag=dag,
)

download_dataset >> untar_dataset >> extract_data_from_csv >> extract_data_from_tsv >> extract_data_from_fixed_width >> consolidate_data >> transform_data