import { Component, OnInit } from '@angular/core';
import { RequestHandlerService } from 'src/app/services/request-handler.service';
import { TicketObjectModel } from './ticket.model';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})
export class TicketComponent implements OnInit {
  listOfAllTickets: any[] = [];

  successMessage: string = '';
  errorMessages: any[] = [];

  ticketForm = {
    inputComplaintId: '',
    inputCustomerName: '',
    inputCustomerAge: '',
    inputCustomerAddress: '',
    inputProblemDesc: '',
    inputComplaintDate: '',
    inputProblemStatus: '',
  };

  showCreateNewButton = false;

  searchText: string = '';

  ticketObjectModel: TicketObjectModel = new TicketObjectModel();

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
    // let body = {
    //   cust_name: this.inputCustomerName,
    //   cust_age: this.inputCustomerAge,
    //   cust_address: this.inputCustomerAddress,
    //   problem_desc: this.inputProblemDesc,
    //   date: this.inputComplaintDate,
    //   problem_status: this.inputProblemStatus,
    // };

    this.ticketObjectModel.cust_name = this.ticketForm.inputCustomerName;
    this.ticketObjectModel.cust_age = +this.ticketForm.inputCustomerAge;
    this.ticketObjectModel.cust_address = this.ticketForm.inputCustomerAddress;
    this.ticketObjectModel.problem_desc = this.ticketForm.inputProblemDesc;
    this.ticketObjectModel.date = this.ticketForm.inputComplaintDate;
    this.ticketObjectModel.problem_status = this.ticketForm.inputProblemStatus;

    this.requestHandlerService
      .postRequest('api/complaint', this.ticketObjectModel)
      .subscribe(
        (resultData: any) => {
          console.log(resultData);
          this.errorMessages = [];
          this.successMessage = 'New Entry Created Successfully';
          this.loadAllTickets();
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

    this.ticketForm.inputComplaintId = item.id;
    this.ticketForm.inputCustomerName = item.cust_name;
    this.ticketForm.inputCustomerAge = item.cust_age;
    this.ticketForm.inputCustomerAddress = item.cust_address;
    this.ticketForm.inputProblemDesc = item.problem_desc;
    this.ticketForm.inputComplaintDate = item.date;
    this.ticketForm.inputProblemStatus = item.problem_status;
  }

  updateTicket() {
    // let body = {
    //   cust_name: this.inputCustomerName,
    //   cust_age: this.inputCustomerAge,
    //   cust_address: this.inputCustomerAddress,
    //   problem_desc: this.inputProblemDesc,
    //   date: this.inputComplaintDate,
    //   problem_status: this.inputProblemStatus,
    // };

    this.ticketObjectModel.cust_name = this.ticketForm.inputCustomerName;
    this.ticketObjectModel.cust_age = +this.ticketForm.inputCustomerAge;
    this.ticketObjectModel.cust_address = this.ticketForm.inputCustomerAddress;
    this.ticketObjectModel.problem_desc = this.ticketForm.inputProblemDesc;
    this.ticketObjectModel.date = this.ticketForm.inputComplaintDate;
    this.ticketObjectModel.problem_status = this.ticketForm.inputProblemStatus;

    this.requestHandlerService
      .updateRequest(
        'api/complaint',
        this.ticketObjectModel,
        this.ticketForm.inputComplaintId
      )
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
    this.ticketForm.inputComplaintId = '';
    this.ticketForm.inputCustomerName = '';
    this.ticketForm.inputCustomerAge = '';
    this.ticketForm.inputCustomerAddress = '';
    this.ticketForm.inputProblemDesc = '';
    this.ticketForm.inputComplaintDate = '';
    this.ticketForm.inputProblemStatus = '';
  }
}
