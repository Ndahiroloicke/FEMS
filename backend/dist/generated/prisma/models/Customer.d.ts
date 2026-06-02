import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CustomerModel = runtime.Types.Result.DefaultSelection<Prisma.$CustomerPayload>;
export type AggregateCustomer = {
    _count: CustomerCountAggregateOutputType | null;
    _min: CustomerMinAggregateOutputType | null;
    _max: CustomerMaxAggregateOutputType | null;
};
export type CustomerMinAggregateOutputType = {
    id: string | null;
    fullName: string | null;
    nationalId: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CustomerMaxAggregateOutputType = {
    id: string | null;
    fullName: string | null;
    nationalId: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CustomerCountAggregateOutputType = {
    id: number;
    fullName: number;
    nationalId: number;
    email: number;
    phone: number;
    address: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type CustomerMinAggregateInputType = {
    id?: true;
    fullName?: true;
    nationalId?: true;
    email?: true;
    phone?: true;
    address?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CustomerMaxAggregateInputType = {
    id?: true;
    fullName?: true;
    nationalId?: true;
    email?: true;
    phone?: true;
    address?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CustomerCountAggregateInputType = {
    id?: true;
    fullName?: true;
    nationalId?: true;
    email?: true;
    phone?: true;
    address?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type CustomerAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CustomerWhereInput;
    orderBy?: Prisma.CustomerOrderByWithRelationInput | Prisma.CustomerOrderByWithRelationInput[];
    cursor?: Prisma.CustomerWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CustomerCountAggregateInputType;
    _min?: CustomerMinAggregateInputType;
    _max?: CustomerMaxAggregateInputType;
};
export type GetCustomerAggregateType<T extends CustomerAggregateArgs> = {
    [P in keyof T & keyof AggregateCustomer]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCustomer[P]> : Prisma.GetScalarType<T[P], AggregateCustomer[P]>;
};
export type CustomerGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CustomerWhereInput;
    orderBy?: Prisma.CustomerOrderByWithAggregationInput | Prisma.CustomerOrderByWithAggregationInput[];
    by: Prisma.CustomerScalarFieldEnum[] | Prisma.CustomerScalarFieldEnum;
    having?: Prisma.CustomerScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CustomerCountAggregateInputType | true;
    _min?: CustomerMinAggregateInputType;
    _max?: CustomerMaxAggregateInputType;
};
export type CustomerGroupByOutputType = {
    id: string;
    fullName: string;
    nationalId: string;
    email: string | null;
    phone: string;
    address: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: CustomerCountAggregateOutputType | null;
    _min: CustomerMinAggregateOutputType | null;
    _max: CustomerMaxAggregateOutputType | null;
};
export type GetCustomerGroupByPayload<T extends CustomerGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CustomerGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CustomerGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CustomerGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CustomerGroupByOutputType[P]>;
}>>;
export type CustomerWhereInput = {
    AND?: Prisma.CustomerWhereInput | Prisma.CustomerWhereInput[];
    OR?: Prisma.CustomerWhereInput[];
    NOT?: Prisma.CustomerWhereInput | Prisma.CustomerWhereInput[];
    id?: Prisma.StringFilter<"Customer"> | string;
    fullName?: Prisma.StringFilter<"Customer"> | string;
    nationalId?: Prisma.StringFilter<"Customer"> | string;
    email?: Prisma.StringNullableFilter<"Customer"> | string | null;
    phone?: Prisma.StringFilter<"Customer"> | string;
    address?: Prisma.StringNullableFilter<"Customer"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Customer"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Customer"> | Date | string;
    extinguishers?: Prisma.FireExtinguisherListRelationFilter;
    notifications?: Prisma.NotificationListRelationFilter;
    escalations?: Prisma.EscalationListRelationFilter;
};
export type CustomerOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    nationalId?: Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    address?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    extinguishers?: Prisma.FireExtinguisherOrderByRelationAggregateInput;
    notifications?: Prisma.NotificationOrderByRelationAggregateInput;
    escalations?: Prisma.EscalationOrderByRelationAggregateInput;
};
export type CustomerWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    nationalId?: string;
    AND?: Prisma.CustomerWhereInput | Prisma.CustomerWhereInput[];
    OR?: Prisma.CustomerWhereInput[];
    NOT?: Prisma.CustomerWhereInput | Prisma.CustomerWhereInput[];
    fullName?: Prisma.StringFilter<"Customer"> | string;
    email?: Prisma.StringNullableFilter<"Customer"> | string | null;
    phone?: Prisma.StringFilter<"Customer"> | string;
    address?: Prisma.StringNullableFilter<"Customer"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Customer"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Customer"> | Date | string;
    extinguishers?: Prisma.FireExtinguisherListRelationFilter;
    notifications?: Prisma.NotificationListRelationFilter;
    escalations?: Prisma.EscalationListRelationFilter;
}, "id" | "nationalId">;
export type CustomerOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    nationalId?: Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    address?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.CustomerCountOrderByAggregateInput;
    _max?: Prisma.CustomerMaxOrderByAggregateInput;
    _min?: Prisma.CustomerMinOrderByAggregateInput;
};
export type CustomerScalarWhereWithAggregatesInput = {
    AND?: Prisma.CustomerScalarWhereWithAggregatesInput | Prisma.CustomerScalarWhereWithAggregatesInput[];
    OR?: Prisma.CustomerScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CustomerScalarWhereWithAggregatesInput | Prisma.CustomerScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Customer"> | string;
    fullName?: Prisma.StringWithAggregatesFilter<"Customer"> | string;
    nationalId?: Prisma.StringWithAggregatesFilter<"Customer"> | string;
    email?: Prisma.StringNullableWithAggregatesFilter<"Customer"> | string | null;
    phone?: Prisma.StringWithAggregatesFilter<"Customer"> | string;
    address?: Prisma.StringNullableWithAggregatesFilter<"Customer"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Customer"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Customer"> | Date | string;
};
export type CustomerCreateInput = {
    id?: string;
    fullName: string;
    nationalId: string;
    email?: string | null;
    phone: string;
    address?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    extinguishers?: Prisma.FireExtinguisherCreateNestedManyWithoutCustomerInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutCustomerInput;
    escalations?: Prisma.EscalationCreateNestedManyWithoutCustomerInput;
};
export type CustomerUncheckedCreateInput = {
    id?: string;
    fullName: string;
    nationalId: string;
    email?: string | null;
    phone: string;
    address?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    extinguishers?: Prisma.FireExtinguisherUncheckedCreateNestedManyWithoutCustomerInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutCustomerInput;
    escalations?: Prisma.EscalationUncheckedCreateNestedManyWithoutCustomerInput;
};
export type CustomerUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    nationalId?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    extinguishers?: Prisma.FireExtinguisherUpdateManyWithoutCustomerNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutCustomerNestedInput;
    escalations?: Prisma.EscalationUpdateManyWithoutCustomerNestedInput;
};
export type CustomerUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    nationalId?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    extinguishers?: Prisma.FireExtinguisherUncheckedUpdateManyWithoutCustomerNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutCustomerNestedInput;
    escalations?: Prisma.EscalationUncheckedUpdateManyWithoutCustomerNestedInput;
};
export type CustomerCreateManyInput = {
    id?: string;
    fullName: string;
    nationalId: string;
    email?: string | null;
    phone: string;
    address?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CustomerUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    nationalId?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CustomerUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    nationalId?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CustomerCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    nationalId?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CustomerMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    nationalId?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CustomerMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    nationalId?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CustomerScalarRelationFilter = {
    is?: Prisma.CustomerWhereInput;
    isNot?: Prisma.CustomerWhereInput;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type CustomerCreateNestedOneWithoutExtinguishersInput = {
    create?: Prisma.XOR<Prisma.CustomerCreateWithoutExtinguishersInput, Prisma.CustomerUncheckedCreateWithoutExtinguishersInput>;
    connectOrCreate?: Prisma.CustomerCreateOrConnectWithoutExtinguishersInput;
    connect?: Prisma.CustomerWhereUniqueInput;
};
export type CustomerUpdateOneRequiredWithoutExtinguishersNestedInput = {
    create?: Prisma.XOR<Prisma.CustomerCreateWithoutExtinguishersInput, Prisma.CustomerUncheckedCreateWithoutExtinguishersInput>;
    connectOrCreate?: Prisma.CustomerCreateOrConnectWithoutExtinguishersInput;
    upsert?: Prisma.CustomerUpsertWithoutExtinguishersInput;
    connect?: Prisma.CustomerWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CustomerUpdateToOneWithWhereWithoutExtinguishersInput, Prisma.CustomerUpdateWithoutExtinguishersInput>, Prisma.CustomerUncheckedUpdateWithoutExtinguishersInput>;
};
export type CustomerCreateNestedOneWithoutNotificationsInput = {
    create?: Prisma.XOR<Prisma.CustomerCreateWithoutNotificationsInput, Prisma.CustomerUncheckedCreateWithoutNotificationsInput>;
    connectOrCreate?: Prisma.CustomerCreateOrConnectWithoutNotificationsInput;
    connect?: Prisma.CustomerWhereUniqueInput;
};
export type CustomerUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: Prisma.XOR<Prisma.CustomerCreateWithoutNotificationsInput, Prisma.CustomerUncheckedCreateWithoutNotificationsInput>;
    connectOrCreate?: Prisma.CustomerCreateOrConnectWithoutNotificationsInput;
    upsert?: Prisma.CustomerUpsertWithoutNotificationsInput;
    connect?: Prisma.CustomerWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CustomerUpdateToOneWithWhereWithoutNotificationsInput, Prisma.CustomerUpdateWithoutNotificationsInput>, Prisma.CustomerUncheckedUpdateWithoutNotificationsInput>;
};
export type CustomerCreateNestedOneWithoutEscalationsInput = {
    create?: Prisma.XOR<Prisma.CustomerCreateWithoutEscalationsInput, Prisma.CustomerUncheckedCreateWithoutEscalationsInput>;
    connectOrCreate?: Prisma.CustomerCreateOrConnectWithoutEscalationsInput;
    connect?: Prisma.CustomerWhereUniqueInput;
};
export type CustomerUpdateOneRequiredWithoutEscalationsNestedInput = {
    create?: Prisma.XOR<Prisma.CustomerCreateWithoutEscalationsInput, Prisma.CustomerUncheckedCreateWithoutEscalationsInput>;
    connectOrCreate?: Prisma.CustomerCreateOrConnectWithoutEscalationsInput;
    upsert?: Prisma.CustomerUpsertWithoutEscalationsInput;
    connect?: Prisma.CustomerWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CustomerUpdateToOneWithWhereWithoutEscalationsInput, Prisma.CustomerUpdateWithoutEscalationsInput>, Prisma.CustomerUncheckedUpdateWithoutEscalationsInput>;
};
export type CustomerCreateWithoutExtinguishersInput = {
    id?: string;
    fullName: string;
    nationalId: string;
    email?: string | null;
    phone: string;
    address?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    notifications?: Prisma.NotificationCreateNestedManyWithoutCustomerInput;
    escalations?: Prisma.EscalationCreateNestedManyWithoutCustomerInput;
};
export type CustomerUncheckedCreateWithoutExtinguishersInput = {
    id?: string;
    fullName: string;
    nationalId: string;
    email?: string | null;
    phone: string;
    address?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutCustomerInput;
    escalations?: Prisma.EscalationUncheckedCreateNestedManyWithoutCustomerInput;
};
export type CustomerCreateOrConnectWithoutExtinguishersInput = {
    where: Prisma.CustomerWhereUniqueInput;
    create: Prisma.XOR<Prisma.CustomerCreateWithoutExtinguishersInput, Prisma.CustomerUncheckedCreateWithoutExtinguishersInput>;
};
export type CustomerUpsertWithoutExtinguishersInput = {
    update: Prisma.XOR<Prisma.CustomerUpdateWithoutExtinguishersInput, Prisma.CustomerUncheckedUpdateWithoutExtinguishersInput>;
    create: Prisma.XOR<Prisma.CustomerCreateWithoutExtinguishersInput, Prisma.CustomerUncheckedCreateWithoutExtinguishersInput>;
    where?: Prisma.CustomerWhereInput;
};
export type CustomerUpdateToOneWithWhereWithoutExtinguishersInput = {
    where?: Prisma.CustomerWhereInput;
    data: Prisma.XOR<Prisma.CustomerUpdateWithoutExtinguishersInput, Prisma.CustomerUncheckedUpdateWithoutExtinguishersInput>;
};
export type CustomerUpdateWithoutExtinguishersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    nationalId?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notifications?: Prisma.NotificationUpdateManyWithoutCustomerNestedInput;
    escalations?: Prisma.EscalationUpdateManyWithoutCustomerNestedInput;
};
export type CustomerUncheckedUpdateWithoutExtinguishersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    nationalId?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutCustomerNestedInput;
    escalations?: Prisma.EscalationUncheckedUpdateManyWithoutCustomerNestedInput;
};
export type CustomerCreateWithoutNotificationsInput = {
    id?: string;
    fullName: string;
    nationalId: string;
    email?: string | null;
    phone: string;
    address?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    extinguishers?: Prisma.FireExtinguisherCreateNestedManyWithoutCustomerInput;
    escalations?: Prisma.EscalationCreateNestedManyWithoutCustomerInput;
};
export type CustomerUncheckedCreateWithoutNotificationsInput = {
    id?: string;
    fullName: string;
    nationalId: string;
    email?: string | null;
    phone: string;
    address?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    extinguishers?: Prisma.FireExtinguisherUncheckedCreateNestedManyWithoutCustomerInput;
    escalations?: Prisma.EscalationUncheckedCreateNestedManyWithoutCustomerInput;
};
export type CustomerCreateOrConnectWithoutNotificationsInput = {
    where: Prisma.CustomerWhereUniqueInput;
    create: Prisma.XOR<Prisma.CustomerCreateWithoutNotificationsInput, Prisma.CustomerUncheckedCreateWithoutNotificationsInput>;
};
export type CustomerUpsertWithoutNotificationsInput = {
    update: Prisma.XOR<Prisma.CustomerUpdateWithoutNotificationsInput, Prisma.CustomerUncheckedUpdateWithoutNotificationsInput>;
    create: Prisma.XOR<Prisma.CustomerCreateWithoutNotificationsInput, Prisma.CustomerUncheckedCreateWithoutNotificationsInput>;
    where?: Prisma.CustomerWhereInput;
};
export type CustomerUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: Prisma.CustomerWhereInput;
    data: Prisma.XOR<Prisma.CustomerUpdateWithoutNotificationsInput, Prisma.CustomerUncheckedUpdateWithoutNotificationsInput>;
};
export type CustomerUpdateWithoutNotificationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    nationalId?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    extinguishers?: Prisma.FireExtinguisherUpdateManyWithoutCustomerNestedInput;
    escalations?: Prisma.EscalationUpdateManyWithoutCustomerNestedInput;
};
export type CustomerUncheckedUpdateWithoutNotificationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    nationalId?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    extinguishers?: Prisma.FireExtinguisherUncheckedUpdateManyWithoutCustomerNestedInput;
    escalations?: Prisma.EscalationUncheckedUpdateManyWithoutCustomerNestedInput;
};
export type CustomerCreateWithoutEscalationsInput = {
    id?: string;
    fullName: string;
    nationalId: string;
    email?: string | null;
    phone: string;
    address?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    extinguishers?: Prisma.FireExtinguisherCreateNestedManyWithoutCustomerInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutCustomerInput;
};
export type CustomerUncheckedCreateWithoutEscalationsInput = {
    id?: string;
    fullName: string;
    nationalId: string;
    email?: string | null;
    phone: string;
    address?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    extinguishers?: Prisma.FireExtinguisherUncheckedCreateNestedManyWithoutCustomerInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutCustomerInput;
};
export type CustomerCreateOrConnectWithoutEscalationsInput = {
    where: Prisma.CustomerWhereUniqueInput;
    create: Prisma.XOR<Prisma.CustomerCreateWithoutEscalationsInput, Prisma.CustomerUncheckedCreateWithoutEscalationsInput>;
};
export type CustomerUpsertWithoutEscalationsInput = {
    update: Prisma.XOR<Prisma.CustomerUpdateWithoutEscalationsInput, Prisma.CustomerUncheckedUpdateWithoutEscalationsInput>;
    create: Prisma.XOR<Prisma.CustomerCreateWithoutEscalationsInput, Prisma.CustomerUncheckedCreateWithoutEscalationsInput>;
    where?: Prisma.CustomerWhereInput;
};
export type CustomerUpdateToOneWithWhereWithoutEscalationsInput = {
    where?: Prisma.CustomerWhereInput;
    data: Prisma.XOR<Prisma.CustomerUpdateWithoutEscalationsInput, Prisma.CustomerUncheckedUpdateWithoutEscalationsInput>;
};
export type CustomerUpdateWithoutEscalationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    nationalId?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    extinguishers?: Prisma.FireExtinguisherUpdateManyWithoutCustomerNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutCustomerNestedInput;
};
export type CustomerUncheckedUpdateWithoutEscalationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    nationalId?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    extinguishers?: Prisma.FireExtinguisherUncheckedUpdateManyWithoutCustomerNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutCustomerNestedInput;
};
export type CustomerCountOutputType = {
    extinguishers: number;
    notifications: number;
    escalations: number;
};
export type CustomerCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    extinguishers?: boolean | CustomerCountOutputTypeCountExtinguishersArgs;
    notifications?: boolean | CustomerCountOutputTypeCountNotificationsArgs;
    escalations?: boolean | CustomerCountOutputTypeCountEscalationsArgs;
};
export type CustomerCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerCountOutputTypeSelect<ExtArgs> | null;
};
export type CustomerCountOutputTypeCountExtinguishersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FireExtinguisherWhereInput;
};
export type CustomerCountOutputTypeCountNotificationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationWhereInput;
};
export type CustomerCountOutputTypeCountEscalationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EscalationWhereInput;
};
export type CustomerSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fullName?: boolean;
    nationalId?: boolean;
    email?: boolean;
    phone?: boolean;
    address?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    extinguishers?: boolean | Prisma.Customer$extinguishersArgs<ExtArgs>;
    notifications?: boolean | Prisma.Customer$notificationsArgs<ExtArgs>;
    escalations?: boolean | Prisma.Customer$escalationsArgs<ExtArgs>;
    _count?: boolean | Prisma.CustomerCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["customer"]>;
export type CustomerSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fullName?: boolean;
    nationalId?: boolean;
    email?: boolean;
    phone?: boolean;
    address?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["customer"]>;
export type CustomerSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fullName?: boolean;
    nationalId?: boolean;
    email?: boolean;
    phone?: boolean;
    address?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["customer"]>;
export type CustomerSelectScalar = {
    id?: boolean;
    fullName?: boolean;
    nationalId?: boolean;
    email?: boolean;
    phone?: boolean;
    address?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type CustomerOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "fullName" | "nationalId" | "email" | "phone" | "address" | "createdAt" | "updatedAt", ExtArgs["result"]["customer"]>;
export type CustomerInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    extinguishers?: boolean | Prisma.Customer$extinguishersArgs<ExtArgs>;
    notifications?: boolean | Prisma.Customer$notificationsArgs<ExtArgs>;
    escalations?: boolean | Prisma.Customer$escalationsArgs<ExtArgs>;
    _count?: boolean | Prisma.CustomerCountOutputTypeDefaultArgs<ExtArgs>;
};
export type CustomerIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type CustomerIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $CustomerPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Customer";
    objects: {
        extinguishers: Prisma.$FireExtinguisherPayload<ExtArgs>[];
        notifications: Prisma.$NotificationPayload<ExtArgs>[];
        escalations: Prisma.$EscalationPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        fullName: string;
        nationalId: string;
        email: string | null;
        phone: string;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["customer"]>;
    composites: {};
};
export type CustomerGetPayload<S extends boolean | null | undefined | CustomerDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CustomerPayload, S>;
export type CustomerCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CustomerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CustomerCountAggregateInputType | true;
};
export interface CustomerDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Customer'];
        meta: {
            name: 'Customer';
        };
    };
    findUnique<T extends CustomerFindUniqueArgs>(args: Prisma.SelectSubset<T, CustomerFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CustomerClient<runtime.Types.Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CustomerFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CustomerFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CustomerClient<runtime.Types.Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CustomerFindFirstArgs>(args?: Prisma.SelectSubset<T, CustomerFindFirstArgs<ExtArgs>>): Prisma.Prisma__CustomerClient<runtime.Types.Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CustomerFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CustomerFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CustomerClient<runtime.Types.Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CustomerFindManyArgs>(args?: Prisma.SelectSubset<T, CustomerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CustomerCreateArgs>(args: Prisma.SelectSubset<T, CustomerCreateArgs<ExtArgs>>): Prisma.Prisma__CustomerClient<runtime.Types.Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CustomerCreateManyArgs>(args?: Prisma.SelectSubset<T, CustomerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CustomerCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CustomerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CustomerDeleteArgs>(args: Prisma.SelectSubset<T, CustomerDeleteArgs<ExtArgs>>): Prisma.Prisma__CustomerClient<runtime.Types.Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CustomerUpdateArgs>(args: Prisma.SelectSubset<T, CustomerUpdateArgs<ExtArgs>>): Prisma.Prisma__CustomerClient<runtime.Types.Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CustomerDeleteManyArgs>(args?: Prisma.SelectSubset<T, CustomerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CustomerUpdateManyArgs>(args: Prisma.SelectSubset<T, CustomerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CustomerUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CustomerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CustomerUpsertArgs>(args: Prisma.SelectSubset<T, CustomerUpsertArgs<ExtArgs>>): Prisma.Prisma__CustomerClient<runtime.Types.Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CustomerCountArgs>(args?: Prisma.Subset<T, CustomerCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CustomerCountAggregateOutputType> : number>;
    aggregate<T extends CustomerAggregateArgs>(args: Prisma.Subset<T, CustomerAggregateArgs>): Prisma.PrismaPromise<GetCustomerAggregateType<T>>;
    groupBy<T extends CustomerGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CustomerGroupByArgs['orderBy'];
    } : {
        orderBy?: CustomerGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CustomerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CustomerFieldRefs;
}
export interface Prisma__CustomerClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    extinguishers<T extends Prisma.Customer$extinguishersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Customer$extinguishersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FireExtinguisherPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    notifications<T extends Prisma.Customer$notificationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Customer$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    escalations<T extends Prisma.Customer$escalationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Customer$escalationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EscalationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CustomerFieldRefs {
    readonly id: Prisma.FieldRef<"Customer", 'String'>;
    readonly fullName: Prisma.FieldRef<"Customer", 'String'>;
    readonly nationalId: Prisma.FieldRef<"Customer", 'String'>;
    readonly email: Prisma.FieldRef<"Customer", 'String'>;
    readonly phone: Prisma.FieldRef<"Customer", 'String'>;
    readonly address: Prisma.FieldRef<"Customer", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Customer", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Customer", 'DateTime'>;
}
export type CustomerFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerSelect<ExtArgs> | null;
    omit?: Prisma.CustomerOmit<ExtArgs> | null;
    include?: Prisma.CustomerInclude<ExtArgs> | null;
    where: Prisma.CustomerWhereUniqueInput;
};
export type CustomerFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerSelect<ExtArgs> | null;
    omit?: Prisma.CustomerOmit<ExtArgs> | null;
    include?: Prisma.CustomerInclude<ExtArgs> | null;
    where: Prisma.CustomerWhereUniqueInput;
};
export type CustomerFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerSelect<ExtArgs> | null;
    omit?: Prisma.CustomerOmit<ExtArgs> | null;
    include?: Prisma.CustomerInclude<ExtArgs> | null;
    where?: Prisma.CustomerWhereInput;
    orderBy?: Prisma.CustomerOrderByWithRelationInput | Prisma.CustomerOrderByWithRelationInput[];
    cursor?: Prisma.CustomerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CustomerScalarFieldEnum | Prisma.CustomerScalarFieldEnum[];
};
export type CustomerFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerSelect<ExtArgs> | null;
    omit?: Prisma.CustomerOmit<ExtArgs> | null;
    include?: Prisma.CustomerInclude<ExtArgs> | null;
    where?: Prisma.CustomerWhereInput;
    orderBy?: Prisma.CustomerOrderByWithRelationInput | Prisma.CustomerOrderByWithRelationInput[];
    cursor?: Prisma.CustomerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CustomerScalarFieldEnum | Prisma.CustomerScalarFieldEnum[];
};
export type CustomerFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerSelect<ExtArgs> | null;
    omit?: Prisma.CustomerOmit<ExtArgs> | null;
    include?: Prisma.CustomerInclude<ExtArgs> | null;
    where?: Prisma.CustomerWhereInput;
    orderBy?: Prisma.CustomerOrderByWithRelationInput | Prisma.CustomerOrderByWithRelationInput[];
    cursor?: Prisma.CustomerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CustomerScalarFieldEnum | Prisma.CustomerScalarFieldEnum[];
};
export type CustomerCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerSelect<ExtArgs> | null;
    omit?: Prisma.CustomerOmit<ExtArgs> | null;
    include?: Prisma.CustomerInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CustomerCreateInput, Prisma.CustomerUncheckedCreateInput>;
};
export type CustomerCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CustomerCreateManyInput | Prisma.CustomerCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CustomerCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CustomerOmit<ExtArgs> | null;
    data: Prisma.CustomerCreateManyInput | Prisma.CustomerCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CustomerUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerSelect<ExtArgs> | null;
    omit?: Prisma.CustomerOmit<ExtArgs> | null;
    include?: Prisma.CustomerInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CustomerUpdateInput, Prisma.CustomerUncheckedUpdateInput>;
    where: Prisma.CustomerWhereUniqueInput;
};
export type CustomerUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CustomerUpdateManyMutationInput, Prisma.CustomerUncheckedUpdateManyInput>;
    where?: Prisma.CustomerWhereInput;
    limit?: number;
};
export type CustomerUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CustomerOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CustomerUpdateManyMutationInput, Prisma.CustomerUncheckedUpdateManyInput>;
    where?: Prisma.CustomerWhereInput;
    limit?: number;
};
export type CustomerUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerSelect<ExtArgs> | null;
    omit?: Prisma.CustomerOmit<ExtArgs> | null;
    include?: Prisma.CustomerInclude<ExtArgs> | null;
    where: Prisma.CustomerWhereUniqueInput;
    create: Prisma.XOR<Prisma.CustomerCreateInput, Prisma.CustomerUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CustomerUpdateInput, Prisma.CustomerUncheckedUpdateInput>;
};
export type CustomerDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerSelect<ExtArgs> | null;
    omit?: Prisma.CustomerOmit<ExtArgs> | null;
    include?: Prisma.CustomerInclude<ExtArgs> | null;
    where: Prisma.CustomerWhereUniqueInput;
};
export type CustomerDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CustomerWhereInput;
    limit?: number;
};
export type Customer$extinguishersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FireExtinguisherSelect<ExtArgs> | null;
    omit?: Prisma.FireExtinguisherOmit<ExtArgs> | null;
    include?: Prisma.FireExtinguisherInclude<ExtArgs> | null;
    where?: Prisma.FireExtinguisherWhereInput;
    orderBy?: Prisma.FireExtinguisherOrderByWithRelationInput | Prisma.FireExtinguisherOrderByWithRelationInput[];
    cursor?: Prisma.FireExtinguisherWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FireExtinguisherScalarFieldEnum | Prisma.FireExtinguisherScalarFieldEnum[];
};
export type Customer$notificationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    include?: Prisma.NotificationInclude<ExtArgs> | null;
    where?: Prisma.NotificationWhereInput;
    orderBy?: Prisma.NotificationOrderByWithRelationInput | Prisma.NotificationOrderByWithRelationInput[];
    cursor?: Prisma.NotificationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NotificationScalarFieldEnum | Prisma.NotificationScalarFieldEnum[];
};
export type Customer$escalationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EscalationSelect<ExtArgs> | null;
    omit?: Prisma.EscalationOmit<ExtArgs> | null;
    include?: Prisma.EscalationInclude<ExtArgs> | null;
    where?: Prisma.EscalationWhereInput;
    orderBy?: Prisma.EscalationOrderByWithRelationInput | Prisma.EscalationOrderByWithRelationInput[];
    cursor?: Prisma.EscalationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EscalationScalarFieldEnum | Prisma.EscalationScalarFieldEnum[];
};
export type CustomerDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerSelect<ExtArgs> | null;
    omit?: Prisma.CustomerOmit<ExtArgs> | null;
    include?: Prisma.CustomerInclude<ExtArgs> | null;
};
