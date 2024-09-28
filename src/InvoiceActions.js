import dispatcher from './dispatcher';

export const createInvoice = (invoice) => {
  console.log(invoice);
  dispatcher.dispatch({
    type: 'CREATE_INVOICE',
    payload: invoice,
  });
};

export const markInvoiceAsPaid = (invoiceId) => {
  dispatcher.dispatch({
    type: 'MARK_INVOICE_AS_PAID',
    payload: invoiceId,
  });
};

export const resetInvoices = () => {
  dispatcher.dispatch({
    type: 'RESET_INVOICES',
  });
};