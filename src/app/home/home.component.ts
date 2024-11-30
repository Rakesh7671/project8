import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  myapi: any[] = [];

  ngOnInit(): void {
    this.getData();
  }

  mine: any = {
    departmentName: '',
    departmentLogo: '',
  };

  http = inject(HttpClient);
  async getData() {
    this.http
      .get('https://projectapi.gerasim.in/api/Complaint/GetParentDepartment')
      .subscribe((result: any) => {
        console.log(result);
        this.myapi = result.data;
      });
  }
  async submitForm() {
    if (this.mine.id) {
      // Update existing object
      this.http
      .put('https://projectapi.gerasim.in/api/Complaint/UpdateDepartment',this.mine)

        .subscribe((res: any) => {
          console.log(res);
          if (res.result) {
            alert('Department updated successfully');
            this.getData();
          } else {
            alert(res.message);
          }
        });
    } else {
      // Create new object
      this.http
        .post('https://projectapi.gerasim.in/api/Complaint/AddNewDepartment', this.mine)
        .subscribe((res: any) => {
          console.log(res);
          if (res.result) {
            alert('Department created successfully');
            this.getData();
          } else {
            alert(res.message);
          }
        });
    }
  }

  //*** using string literals is one way and another is u can append "?departmentId="+id" likke this and end of your url replace departmentId with your actual Id */

  async onUpdate(id: any) {
    const selectedRecord = this.myapi.find((item) => item.id === id);
    if (selectedRecord) {
      this.mine = { ...selectedRecord }; // populate mine with selected record data
      Object.assign(selectedRecord, this.mine);

    }
    this.http
      .put('https://projectapi.gerasim.in/api/Complaint/UpdateDepartment',this.mine)
      .subscribe((res: any) => {
        if (res.result) {
          alert('Department updated sucessfully');
          // console.log(this.mine)
          this.getData();
        } else {
          alert(res.message);
        }
      });
  }

  async onDelete(id: any) {
    const isDelete = confirm('Are you sure to delete this record');
    if (isDelete) {
      this.http
        .delete('http://localhost:8000/firstapi/users/${id}')
        .subscribe((res: any) => {
          if (res.result) {
            alert(' sucessfully delted ');
            // console.log(this.mine)
            // this.getData;
          } else {
            alert(res.message);
          }
        });
    }
  }
}

