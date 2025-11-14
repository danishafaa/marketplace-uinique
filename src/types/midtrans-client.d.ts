// src/types/midtrans-client.d.ts

declare module 'midtrans-client' {
    interface SnapConfig {
        isProduction: boolean;
        serverKey: string;
        clientKey: string;
    }

    interface CoreApiConfig {
        isProduction: boolean;
        serverKey: string;
    }

    interface TransactionDetails {
        order_id: string;
        gross_amount: number;
    }

    interface CustomerDetails {
        first_name?: string;
        last_name?: string;
        email?: string;
        phone?: string;
    }

    interface ItemDetails {
        id: string;
        price: number;
        quantity: number;
        name: string;
    }

    interface SnapTransactionParams {
        transaction_details: TransactionDetails;
        customer_details?: CustomerDetails;
        item_details?: ItemDetails[];
        credit_card?: {
            secure?: boolean;
        };
    }

    interface CoreApiChargeParams {
        payment_type: string;
        transaction_details: TransactionDetails;
        customer_details?: CustomerDetails;
        item_details?: ItemDetails[];
        bank_transfer?: {
            bank: string;
        };
        echannel?: {
            bill_info1?: string;
            bill_info2?: string;
        };
        // Tambahkan payment method lainnya sesuai kebutuhan
    }

    interface SnapTransactionResponse {
        token: string;
        redirect_url: string;
    }

    interface CoreApiChargeResponse {
        status_code: string;
        status_message: string;
        transaction_id: string;
        order_id: string;
        gross_amount: string;
        payment_type: string;
        transaction_time: string;
        transaction_status: string;
        fraud_status: string;
        // Tambahkan properti lainnya sesuai response Midtrans
    }

    interface CaptureResponse {
        status_code: string;
        status_message: string;
        transaction_id: string;
        order_id: string;
        payment_type: string;
        transaction_time: string;
        transaction_status: string;
        fraud_status: string;
        gross_amount: string;
    }

    interface CancelResponse {
        status_code: string;
        status_message: string;
        transaction_id: string;
        order_id: string;
        payment_type: string;
        transaction_time: string;
        transaction_status: string;
        fraud_status: string;
    }

    interface StatusResponse {
        status_code: string;
        status_message: string;
        transaction_id: string;
        order_id: string;
        gross_amount: string;
        payment_type: string;
        transaction_time: string;
        transaction_status: string;
        fraud_status: string;
        settlement_time?: string;
        currency?: string;
    }

    class Snap {
        constructor(config: SnapConfig);
        createTransaction(transaction: SnapTransactionParams): Promise<SnapTransactionResponse>;
        createTransactionToken(transaction: SnapTransactionParams): Promise<string>;
        createTransactionRedirectUrl(transaction: SnapTransactionParams): Promise<string>;
    }

    class CoreApi {
        constructor(config: CoreApiConfig);
        charge(transaction: CoreApiChargeParams): Promise<CoreApiChargeResponse>;
        capture(token: string): Promise<CaptureResponse>;
        cancel(orderId: string): Promise<CancelResponse>;
        status(orderId: string): Promise<StatusResponse>;
    }

    export { Snap, CoreApi };
}