import { EventEmitter } from 'events';
import dispatcher from './dispatcher';

class InvoiceStore extends EventEmitter {
  constructor() {
    super();
    this.invoices = this.loadInvoices(); // Load invoices from local storage
  }

  loadInvoices() {
    const invoices = localStorage.getItem('invoices');
    return invoices ? JSON.parse(invoices) : [];
  }

  saveInvoices() {
    localStorage.setItem('invoices', JSON.stringify(this.invoices));
  }

  createInvoice(invoice) {
    this.invoices.push(invoice);
    this.saveInvoices(); // Save to local storage
    this.emit('change');
  }

  markInvoiceAsPaid(invoiceId) {
    const invoice = this.invoices.find(inv => inv.id === invoiceId);
    if (invoice) {
      invoice.status = 'paid';
      this.saveInvoices(); // Save to local storage
      this.emit('change');
    }
  }

  getInvoices() {
    return this.invoices;
  }

  resetInvoices() {
    this.invoices = []; // Clear the invoices array
    localStorage.removeItem('invoices'); // Remove from local storage
    this.emit('change'); // Notify listeners about the change
  }

  handleActions(action) {
    switch (action.type) {
      case 'CREATE_INVOICE':
        this.createInvoice(action.payload);
        break;
      case 'MARK_INVOICE_AS_PAID':
        this.markInvoiceAsPaid(action.payload);
        break;
      case 'RESET_INVOICES':
        this.resetInvoices();
        break;
      default:
        break;
    }
  }
}

const invoiceStore = new InvoiceStore();
dispatcher.register(invoiceStore.handleActions.bind(invoiceStore));

export default invoiceStore;
