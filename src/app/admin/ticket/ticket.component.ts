import { Component, OnInit } from '@angular/core';
import { RequestHandlerService } from 'src/app/services/request-handler.service';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})
export class TicketComponent implements OnInit {
  listOfAllTickets: any[] = [];

  successMessage: string = '';
  errorMessages: any[] = [];

  inputComplaintId: string = '';
  inputCustomerName: string = '';
  inputCustomerAge: string = '';
  inputCustomerAddress: string = '';
  inputProblemDesc: string = '';
  inputComplaintDate: string = '';
  inputProblemStatus: string = '';

  showCreateNewButton = false;

  searchText:string = "";

  constructor(private requestHandlerService: RequestHandlerService) {}

  ngOnInit(): void {
    this.loadAllTickets();
  }

  loadAllTickets() {
    this.requestHandlerService.getRequest('api/complaint').subscribe(
      (resultData: any) => {
        this.listOfAllTickets = resultData.data;
        console.log(resultData);
      },
      (errorData: any) => {
        console.log(errorData);
      }
    );
  }

  viewNewEntryForm() {
    this.successMessage = '';
    this.errorMessages = [];
    this.clearTicketForm();
    this.showCreateNewButton = true;
  }
  createTicket() {
    let body = {
      cust_name: this.inputCustomerName,
      cust_age: this.inputCustomerAge,
      cust_address: this.inputCustomerAddress,
      problem_desc: this.inputProblemDesc,
      date: this.inputComplaintDate,
      problem_status: this.inputProblemStatus,
    };
    console.log(body);
    this.requestHandlerService.postRequest('api/complaint', body).subscribe(
      (resultData: any) => {
        console.log(resultData);
        this.loadAllTickets();
        this.errorMessages = [];
        this.successMessage = 'New Entry Created Successfully';
        this.clearTicketForm();
      },
      (errorData: any) => {
        console.log(errorData);
        this.successMessage = '';
        this.errorMessages = errorData.error.errors;
      }
    );
  }

  editTicket(item: any) {
    this.successMessage = '';
    this.errorMessages = [];
    this.showCreateNewButton = false;

    this.inputComplaintId = item.id;
    this.inputCustomerName = item.cust_name;
    this.inputCustomerAge = item.cust_age;
    this.inputCustomerAddress = item.cust_address;
    this.inputProblemDesc = item.problem_desc;
    this.inputComplaintDate = item.date;
    this.inputProblemStatus = item.problem_status;
  }

  updateTicket() {
    let body = {
      cust_name: this.inputCustomerName,
      cust_age: this.inputCustomerAge,
      cust_address: this.inputCustomerAddress,
      problem_desc: this.inputProblemDesc,
      date: this.inputComplaintDate,
      problem_status: this.inputProblemStatus,
    };
    this.requestHandlerService
      .updateRequest('api/complaint', body, this.inputComplaintId)
      .subscribe(
        (resultData: any) => {
          console.log(resultData.data);
          this.loadAllTickets();
          this.errorMessages = [];
          this.successMessage = 'Updated Successfully';
        },
        (errorData: any) => {
          console.log(errorData);
          this.successMessage = '';
          this.errorMessages = errorData.error.errors;
        }
      );
  }

  deleteTicket(item: any) {
    this.requestHandlerService
      .deleteRequest('api/complaint', item.id)
      .subscribe(
        (resultData: any) => {
          console.log(resultData);
          this.loadAllTickets();
        },
        (errorData: any) => {
          console.log(errorData);
        }
      );
  }

  searchPhrase(eventData: any) {
      this.searchText = eventData.target.value;

  }

  clearTicketForm() {
    this.inputComplaintId = '';
    this.inputCustomerName = '';
    this.inputCustomerAge = '';
    this.inputCustomerAddress = '';
    this.inputProblemDesc = '';
    this.inputComplaintDate = '';
    this.inputProblemStatus = '';
  }
}
