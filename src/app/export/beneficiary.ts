export interface Beneficiary {
    startDate: string;
    endDate?: string | null | undefined;
    address: string;
    name: string;
    phoneNumber?: string;
    workType: string;
    completed: Boolean;
    uid?: string;
    id?: string;
}
