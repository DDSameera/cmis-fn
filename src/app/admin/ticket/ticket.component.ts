import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RequestHandlerService } from 'src/app/_services/request-handler.service';
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

  showCustomValidationErrors = false;

  public ticketObjectModel: TicketObjectModel = {
    complaintId: '',
    cust_name: '',
    cust_age: 0,
    cust_address: '',
    problem_desc: '',
    date: '',
    problem_status: '',
  };

  showCreateNewButton = false;

  searchText: string = '';

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
    this.showCustomValidationErrors = true;
    console.log('open Modal', this.showCustomValidationErrors);

    this.successMessage = '';
    this.errorMessages = [];
    this.clearTicketForm();
    this.showCreateNewButton = true;
  }

  closeModal(myForm:NgForm) {
    myForm.resetForm({});
    this.showCustomValidationErrors = false;
    console.log('close Modal', this.showCustomValidationErrors);
  }
  createTicket() {
    if (this.passValidate(this.ticketObjectModel)) {
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
  }

  passValidate(ticketObjectModel: TicketObjectModel): boolean {
    let isValidate = false;
    let validationErrors = [];
    for (let [key, value] of Object.entries(ticketObjectModel)) {
      isValidate = value == '' ? false : true;

      if (key == 'cust_name' && value == '') {
        validationErrors.push('Please enter Customer Name');
      } else if (key == 'cust_age' && value == 0) {
        validationErrors.push('Please enter Valid Age');
      } else if (key == 'cust_address' && value == '') {
        validationErrors.push('Please enter Customer Address');
      }
    }
    this.errorMessages = validationErrors;
    return isValidate;
  }

  editTicket(item: any) {
    this.successMessage = '';
    this.errorMessages = [];
    this.showCreateNewButton = false;

    this.ticketObjectModel.complaintId = item.id;
    this.ticketObjectModel.cust_name = item.cust_name;
    this.ticketObjectModel.cust_age = item.cust_age;
    this.ticketObjectModel.cust_address = item.cust_address;
    this.ticketObjectModel.problem_desc = item.problem_desc;
    this.ticketObjectModel.date = item.date;
    this.ticketObjectModel.problem_status = item.problem_status;
  }

  updateTicket() {
    this.requestHandlerService
      .updateRequest(
        'api/complaint',
        this.ticketObjectModel,
        this.ticketObjectModel.complaintId
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
    this.ticketObjectModel.complaintId = '';
    this.ticketObjectModel.cust_name = '';
    this.ticketObjectModel.cust_age = 0;
    this.ticketObjectModel.cust_address = '';
    this.ticketObjectModel.problem_desc = '';
    this.ticketObjectModel.date = '';
    this.ticketObjectModel.problem_status = '';
  }
}
