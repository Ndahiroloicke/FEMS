import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type FireExtinguisherModel = runtime.Types.Result.DefaultSelection<Prisma.$FireExtinguisherPayload>;
export type AggregateFireExtinguisher = {
    _count: FireExtinguisherCountAggregateOutputType | null;
    _min: FireExtinguisherMinAggregateOutputType | null;
    _max: FireExtinguisherMaxAggregateOutputType | null;
};
export type FireExtinguisherMinAggregateOutputType = {
    id: string | null;
    serialNumber: string | null;
    type: string | null;
    capacity: string | null;
    purchaseDate: Date | null;
    expiryDate: Date | null;
    status: $Enums.ExtinguisherStatus | null;
    customerId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FireExtinguisherMaxAggregateOutputType = {
    id: string | null;
    serialNumber: string | null;
    type: string | null;
    capacity: string | null;
    purchaseDate: Date | null;
    expiryDate: Date | null;
    status: $Enums.ExtinguisherStatus | null;
    customerId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FireExtinguisherCountAggregateOutputType = {
    id: number;
    serialNumber: number;
    type: number;
    capacity: number;
    purchaseDate: number;
    expiryDate: number;
    status: number;
    customerId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type FireExtinguisherMinAggregateInputType = {
    id?: true;
    serialNumber?: true;
    type?: true;
    capacity?: true;
    purchaseDate?: true;
    expiryDate?: true;
    status?: true;
    customerId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FireExtinguisherMaxAggregateInputType = {
    id?: true;
    serialNumber?: true;
    type?: true;
    capacity?: true;
    purchaseDate?: true;
    expiryDate?: true;
    status?: true;
    customerId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FireExtinguisherCountAggregateInputType = {
    id?: true;
    serialNumber?: true;
    type?: true;
    capacity?: true;
    purchaseDate?: true;
    expiryDate?: true;
    status?: true;
    customerId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type FireExtinguisherAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FireExtinguisherWhereInput;
    orderBy?: Prisma.FireExtinguisherOrderByWithRelationInput | Prisma.FireExtinguisherOrderByWithRelationInput[];
    cursor?: Prisma.FireExtinguisherWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | FireExtinguisherCountAggregateInputType;
    _min?: FireExtinguisherMinAggregateInputType;
    _max?: FireExtinguisherMaxAggregateInputType;
};
export type GetFireExtinguisherAggregateType<T extends FireExtinguisherAggregateArgs> = {
    [P in keyof T & keyof AggregateFireExtinguisher]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFireExtinguisher[P]> : Prisma.GetScalarType<T[P], AggregateFireExtinguisher[P]>;
};
export type FireExtinguisherGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FireExtinguisherWhereInput;
    orderBy?: Prisma.FireExtinguisherOrderByWithAggregationInput | Prisma.FireExtinguisherOrderByWithAggregationInput[];
    by: Prisma.FireExtinguisherScalarFieldEnum[] | Prisma.FireExtinguisherScalarFieldEnum;
    having?: Prisma.FireExtinguisherScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FireExtinguisherCountAggregateInputType | true;
    _min?: FireExtinguisherMinAggregateInputType;
    _max?: FireExtinguisherMaxAggregateInputType;
};
export type FireExtinguisherGroupByOutputType = {
    id: string;
    serialNumber: string;
    type: string | null;
    capacity: string | null;
    purchaseDate: Date;
    expiryDate: Date;
    status: $Enums.ExtinguisherStatus;
    customerId: string;
    createdAt: Date;
    updatedAt: Date;
    _count: FireExtinguisherCountAggregateOutputType | null;
    _min: FireExtinguisherMinAggregateOutputType | null;
    _max: FireExtinguisherMaxAggregateOutputType | null;
};
export type GetFireExtinguisherGroupByPayload<T extends FireExtinguisherGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FireExtinguisherGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FireExtinguisherGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FireExtinguisherGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FireExtinguisherGroupByOutputType[P]>;
}>>;
export type FireExtinguisherWhereInput = {
    AND?: Prisma.FireExtinguisherWhereInput | Prisma.FireExtinguisherWhereInput[];
    OR?: Prisma.FireExtinguisherWhereInput[];
    NOT?: Prisma.FireExtinguisherWhereInput | Prisma.FireExtinguisherWhereInput[];
    id?: Prisma.StringFilter<"FireExtinguisher"> | string;
    serialNumber?: Prisma.StringFilter<"FireExtinguisher"> | string;
    type?: Prisma.StringNullableFilter<"FireExtinguisher"> | string | null;
    capacity?: Prisma.StringNullableFilter<"FireExtinguisher"> | string | null;
    purchaseDate?: Prisma.DateTimeFilter<"FireExtinguisher"> | Date | string;
    expiryDate?: Prisma.DateTimeFilter<"FireExtinguisher"> | Date | string;
    status?: Prisma.EnumExtinguisherStatusFilter<"FireExtinguisher"> | $Enums.ExtinguisherStatus;
    customerId?: Prisma.StringFilter<"FireExtinguisher"> | string;
    createdAt?: Prisma.DateTimeFilter<"FireExtinguisher"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"FireExtinguisher"> | Date | string;
    customer?: Prisma.XOR<Prisma.CustomerScalarRelationFilter, Prisma.CustomerWhereInput>;
    notifications?: Prisma.NotificationListRelationFilter;
    escalations?: Prisma.EscalationListRelationFilter;
};
export type FireExtinguisherOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    serialNumber?: Prisma.SortOrder;
    type?: Prisma.SortOrderInput | Prisma.SortOrder;
    capacity?: Prisma.SortOrderInput | Prisma.SortOrder;
    purchaseDate?: Prisma.SortOrder;
    expiryDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    customer?: Prisma.CustomerOrderByWithRelationInput;
    notifications?: Prisma.NotificationOrderByRelationAggregateInput;
    escalations?: Prisma.EscalationOrderByRelationAggregateInput;
};
export type FireExtinguisherWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    serialNumber?: string;
    AND?: Prisma.FireExtinguisherWhereInput | Prisma.FireExtinguisherWhereInput[];
    OR?: Prisma.FireExtinguisherWhereInput[];
    NOT?: Prisma.FireExtinguisherWhereInput | Prisma.FireExtinguisherWhereInput[];
    type?: Prisma.StringNullableFilter<"FireExtinguisher"> | string | null;
    capacity?: Prisma.StringNullableFilter<"FireExtinguisher"> | string | null;
    purchaseDate?: Prisma.DateTimeFilter<"FireExtinguisher"> | Date | string;
    expiryDate?: Prisma.DateTimeFilter<"FireExtinguisher"> | Date | string;
    status?: Prisma.EnumExtinguisherStatusFilter<"FireExtinguisher"> | $Enums.ExtinguisherStatus;
    customerId?: Prisma.StringFilter<"FireExtinguisher"> | string;
    createdAt?: Prisma.DateTimeFilter<"FireExtinguisher"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"FireExtinguisher"> | Date | string;
    customer?: Prisma.XOR<Prisma.CustomerScalarRelationFilter, Prisma.CustomerWhereInput>;
    notifications?: Prisma.NotificationListRelationFilter;
    escalations?: Prisma.EscalationListRelationFilter;
}, "id" | "serialNumber">;
export type FireExtinguisherOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    serialNumber?: Prisma.SortOrder;
    type?: Prisma.SortOrderInput | Prisma.SortOrder;
    capacity?: Prisma.SortOrderInput | Prisma.SortOrder;
    purchaseDate?: Prisma.SortOrder;
    expiryDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.FireExtinguisherCountOrderByAggregateInput;
    _max?: Prisma.FireExtinguisherMaxOrderByAggregateInput;
    _min?: Prisma.FireExtinguisherMinOrderByAggregateInput;
};
export type FireExtinguisherScalarWhereWithAggregatesInput = {
    AND?: Prisma.FireExtinguisherScalarWhereWithAggregatesInput | Prisma.FireExtinguisherScalarWhereWithAggregatesInput[];
    OR?: Prisma.FireExtinguisherScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FireExtinguisherScalarWhereWithAggregatesInput | Prisma.FireExtinguisherScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"FireExtinguisher"> | string;
    serialNumber?: Prisma.StringWithAggregatesFilter<"FireExtinguisher"> | string;
    type?: Prisma.StringNullableWithAggregatesFilter<"FireExtinguisher"> | string | null;
    capacity?: Prisma.StringNullableWithAggregatesFilter<"FireExtinguisher"> | string | null;
    purchaseDate?: Prisma.DateTimeWithAggregatesFilter<"FireExtinguisher"> | Date | string;
    expiryDate?: Prisma.DateTimeWithAggregatesFilter<"FireExtinguisher"> | Date | string;
    status?: Prisma.EnumExtinguisherStatusWithAggregatesFilter<"FireExtinguisher"> | $Enums.ExtinguisherStatus;
    customerId?: Prisma.StringWithAggregatesFilter<"FireExtinguisher"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"FireExtinguisher"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"FireExtinguisher"> | Date | string;
};
export type FireExtinguisherCreateInput = {
    id?: string;
    serialNumber: string;
    type?: string | null;
    capacity?: string | null;
    purchaseDate: Date | string;
    expiryDate: Date | string;
    status?: $Enums.ExtinguisherStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    customer: Prisma.CustomerCreateNestedOneWithoutExtinguishersInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutExtinguisherInput;
    escalations?: Prisma.EscalationCreateNestedManyWithoutExtinguisherInput;
};
export type FireExtinguisherUncheckedCreateInput = {
    id?: string;
    serialNumber: string;
    type?: string | null;
    capacity?: string | null;
    purchaseDate: Date | string;
    expiryDate: Date | string;
    status?: $Enums.ExtinguisherStatus;
    customerId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutExtinguisherInput;
    escalations?: Prisma.EscalationUncheckedCreateNestedManyWithoutExtinguisherInput;
};
export type FireExtinguisherUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    serialNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacity?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumExtinguisherStatusFieldUpdateOperationsInput | $Enums.ExtinguisherStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customer?: Prisma.CustomerUpdateOneRequiredWithoutExtinguishersNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutExtinguisherNestedInput;
    escalations?: Prisma.EscalationUpdateManyWithoutExtinguisherNestedInput;
};
export type FireExtinguisherUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    serialNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacity?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumExtinguisherStatusFieldUpdateOperationsInput | $Enums.ExtinguisherStatus;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutExtinguisherNestedInput;
    escalations?: Prisma.EscalationUncheckedUpdateManyWithoutExtinguisherNestedInput;
};
export type FireExtinguisherCreateManyInput = {
    id?: string;
    serialNumber: string;
    type?: string | null;
    capacity?: string | null;
    purchaseDate: Date | string;
    expiryDate: Date | string;
    status?: $Enums.ExtinguisherStatus;
    customerId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FireExtinguisherUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    serialNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacity?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumExtinguisherStatusFieldUpdateOperationsInput | $Enums.ExtinguisherStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FireExtinguisherUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    serialNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacity?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumExtinguisherStatusFieldUpdateOperationsInput | $Enums.ExtinguisherStatus;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FireExtinguisherListRelationFilter = {
    every?: Prisma.FireExtinguisherWhereInput;
    some?: Prisma.FireExtinguisherWhereInput;
    none?: Prisma.FireExtinguisherWhereInput;
};
export type FireExtinguisherOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type FireExtinguisherCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    serialNumber?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    capacity?: Prisma.SortOrder;
    purchaseDate?: Prisma.SortOrder;
    expiryDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FireExtinguisherMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    serialNumber?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    capacity?: Prisma.SortOrder;
    purchaseDate?: Prisma.SortOrder;
    expiryDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FireExtinguisherMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    serialNumber?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    capacity?: Prisma.SortOrder;
    purchaseDate?: Prisma.SortOrder;
    expiryDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FireExtinguisherScalarRelationFilter = {
    is?: Prisma.FireExtinguisherWhereInput;
    isNot?: Prisma.FireExtinguisherWhereInput;
};
export type FireExtinguisherCreateNestedManyWithoutCustomerInput = {
    create?: Prisma.XOR<Prisma.FireExtinguisherCreateWithoutCustomerInput, Prisma.FireExtinguisherUncheckedCreateWithoutCustomerInput> | Prisma.FireExtinguisherCreateWithoutCustomerInput[] | Prisma.FireExtinguisherUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.FireExtinguisherCreateOrConnectWithoutCustomerInput | Prisma.FireExtinguisherCreateOrConnectWithoutCustomerInput[];
    createMany?: Prisma.FireExtinguisherCreateManyCustomerInputEnvelope;
    connect?: Prisma.FireExtinguisherWhereUniqueInput | Prisma.FireExtinguisherWhereUniqueInput[];
};
export type FireExtinguisherUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: Prisma.XOR<Prisma.FireExtinguisherCreateWithoutCustomerInput, Prisma.FireExtinguisherUncheckedCreateWithoutCustomerInput> | Prisma.FireExtinguisherCreateWithoutCustomerInput[] | Prisma.FireExtinguisherUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.FireExtinguisherCreateOrConnectWithoutCustomerInput | Prisma.FireExtinguisherCreateOrConnectWithoutCustomerInput[];
    createMany?: Prisma.FireExtinguisherCreateManyCustomerInputEnvelope;
    connect?: Prisma.FireExtinguisherWhereUniqueInput | Prisma.FireExtinguisherWhereUniqueInput[];
};
export type FireExtinguisherUpdateManyWithoutCustomerNestedInput = {
    create?: Prisma.XOR<Prisma.FireExtinguisherCreateWithoutCustomerInput, Prisma.FireExtinguisherUncheckedCreateWithoutCustomerInput> | Prisma.FireExtinguisherCreateWithoutCustomerInput[] | Prisma.FireExtinguisherUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.FireExtinguisherCreateOrConnectWithoutCustomerInput | Prisma.FireExtinguisherCreateOrConnectWithoutCustomerInput[];
    upsert?: Prisma.FireExtinguisherUpsertWithWhereUniqueWithoutCustomerInput | Prisma.FireExtinguisherUpsertWithWhereUniqueWithoutCustomerInput[];
    createMany?: Prisma.FireExtinguisherCreateManyCustomerInputEnvelope;
    set?: Prisma.FireExtinguisherWhereUniqueInput | Prisma.FireExtinguisherWhereUniqueInput[];
    disconnect?: Prisma.FireExtinguisherWhereUniqueInput | Prisma.FireExtinguisherWhereUniqueInput[];
    delete?: Prisma.FireExtinguisherWhereUniqueInput | Prisma.FireExtinguisherWhereUniqueInput[];
    connect?: Prisma.FireExtinguisherWhereUniqueInput | Prisma.FireExtinguisherWhereUniqueInput[];
    update?: Prisma.FireExtinguisherUpdateWithWhereUniqueWithoutCustomerInput | Prisma.FireExtinguisherUpdateWithWhereUniqueWithoutCustomerInput[];
    updateMany?: Prisma.FireExtinguisherUpdateManyWithWhereWithoutCustomerInput | Prisma.FireExtinguisherUpdateManyWithWhereWithoutCustomerInput[];
    deleteMany?: Prisma.FireExtinguisherScalarWhereInput | Prisma.FireExtinguisherScalarWhereInput[];
};
export type FireExtinguisherUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: Prisma.XOR<Prisma.FireExtinguisherCreateWithoutCustomerInput, Prisma.FireExtinguisherUncheckedCreateWithoutCustomerInput> | Prisma.FireExtinguisherCreateWithoutCustomerInput[] | Prisma.FireExtinguisherUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.FireExtinguisherCreateOrConnectWithoutCustomerInput | Prisma.FireExtinguisherCreateOrConnectWithoutCustomerInput[];
    upsert?: Prisma.FireExtinguisherUpsertWithWhereUniqueWithoutCustomerInput | Prisma.FireExtinguisherUpsertWithWhereUniqueWithoutCustomerInput[];
    createMany?: Prisma.FireExtinguisherCreateManyCustomerInputEnvelope;
    set?: Prisma.FireExtinguisherWhereUniqueInput | Prisma.FireExtinguisherWhereUniqueInput[];
    disconnect?: Prisma.FireExtinguisherWhereUniqueInput | Prisma.FireExtinguisherWhereUniqueInput[];
    delete?: Prisma.FireExtinguisherWhereUniqueInput | Prisma.FireExtinguisherWhereUniqueInput[];
    connect?: Prisma.FireExtinguisherWhereUniqueInput | Prisma.FireExtinguisherWhereUniqueInput[];
    update?: Prisma.FireExtinguisherUpdateWithWhereUniqueWithoutCustomerInput | Prisma.FireExtinguisherUpdateWithWhereUniqueWithoutCustomerInput[];
    updateMany?: Prisma.FireExtinguisherUpdateManyWithWhereWithoutCustomerInput | Prisma.FireExtinguisherUpdateManyWithWhereWithoutCustomerInput[];
    deleteMany?: Prisma.FireExtinguisherScalarWhereInput | Prisma.FireExtinguisherScalarWhereInput[];
};
export type EnumExtinguisherStatusFieldUpdateOperationsInput = {
    set?: $Enums.ExtinguisherStatus;
};
export type FireExtinguisherCreateNestedOneWithoutNotificationsInput = {
    create?: Prisma.XOR<Prisma.FireExtinguisherCreateWithoutNotificationsInput, Prisma.FireExtinguisherUncheckedCreateWithoutNotificationsInput>;
    connectOrCreate?: Prisma.FireExtinguisherCreateOrConnectWithoutNotificationsInput;
    connect?: Prisma.FireExtinguisherWhereUniqueInput;
};
export type FireExtinguisherUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: Prisma.XOR<Prisma.FireExtinguisherCreateWithoutNotificationsInput, Prisma.FireExtinguisherUncheckedCreateWithoutNotificationsInput>;
    connectOrCreate?: Prisma.FireExtinguisherCreateOrConnectWithoutNotificationsInput;
    upsert?: Prisma.FireExtinguisherUpsertWithoutNotificationsInput;
    connect?: Prisma.FireExtinguisherWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FireExtinguisherUpdateToOneWithWhereWithoutNotificationsInput, Prisma.FireExtinguisherUpdateWithoutNotificationsInput>, Prisma.FireExtinguisherUncheckedUpdateWithoutNotificationsInput>;
};
export type FireExtinguisherCreateNestedOneWithoutEscalationsInput = {
    create?: Prisma.XOR<Prisma.FireExtinguisherCreateWithoutEscalationsInput, Prisma.FireExtinguisherUncheckedCreateWithoutEscalationsInput>;
    connectOrCreate?: Prisma.FireExtinguisherCreateOrConnectWithoutEscalationsInput;
    connect?: Prisma.FireExtinguisherWhereUniqueInput;
};
export type FireExtinguisherUpdateOneRequiredWithoutEscalationsNestedInput = {
    create?: Prisma.XOR<Prisma.FireExtinguisherCreateWithoutEscalationsInput, Prisma.FireExtinguisherUncheckedCreateWithoutEscalationsInput>;
    connectOrCreate?: Prisma.FireExtinguisherCreateOrConnectWithoutEscalationsInput;
    upsert?: Prisma.FireExtinguisherUpsertWithoutEscalationsInput;
    connect?: Prisma.FireExtinguisherWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FireExtinguisherUpdateToOneWithWhereWithoutEscalationsInput, Prisma.FireExtinguisherUpdateWithoutEscalationsInput>, Prisma.FireExtinguisherUncheckedUpdateWithoutEscalationsInput>;
};
export type FireExtinguisherCreateWithoutCustomerInput = {
    id?: string;
    serialNumber: string;
    type?: string | null;
    capacity?: string | null;
    purchaseDate: Date | string;
    expiryDate: Date | string;
    status?: $Enums.ExtinguisherStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    notifications?: Prisma.NotificationCreateNestedManyWithoutExtinguisherInput;
    escalations?: Prisma.EscalationCreateNestedManyWithoutExtinguisherInput;
};
export type FireExtinguisherUncheckedCreateWithoutCustomerInput = {
    id?: string;
    serialNumber: string;
    type?: string | null;
    capacity?: string | null;
    purchaseDate: Date | string;
    expiryDate: Date | string;
    status?: $Enums.ExtinguisherStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutExtinguisherInput;
    escalations?: Prisma.EscalationUncheckedCreateNestedManyWithoutExtinguisherInput;
};
export type FireExtinguisherCreateOrConnectWithoutCustomerInput = {
    where: Prisma.FireExtinguisherWhereUniqueInput;
    create: Prisma.XOR<Prisma.FireExtinguisherCreateWithoutCustomerInput, Prisma.FireExtinguisherUncheckedCreateWithoutCustomerInput>;
};
export type FireExtinguisherCreateManyCustomerInputEnvelope = {
    data: Prisma.FireExtinguisherCreateManyCustomerInput | Prisma.FireExtinguisherCreateManyCustomerInput[];
    skipDuplicates?: boolean;
};
export type FireExtinguisherUpsertWithWhereUniqueWithoutCustomerInput = {
    where: Prisma.FireExtinguisherWhereUniqueInput;
    update: Prisma.XOR<Prisma.FireExtinguisherUpdateWithoutCustomerInput, Prisma.FireExtinguisherUncheckedUpdateWithoutCustomerInput>;
    create: Prisma.XOR<Prisma.FireExtinguisherCreateWithoutCustomerInput, Prisma.FireExtinguisherUncheckedCreateWithoutCustomerInput>;
};
export type FireExtinguisherUpdateWithWhereUniqueWithoutCustomerInput = {
    where: Prisma.FireExtinguisherWhereUniqueInput;
    data: Prisma.XOR<Prisma.FireExtinguisherUpdateWithoutCustomerInput, Prisma.FireExtinguisherUncheckedUpdateWithoutCustomerInput>;
};
export type FireExtinguisherUpdateManyWithWhereWithoutCustomerInput = {
    where: Prisma.FireExtinguisherScalarWhereInput;
    data: Prisma.XOR<Prisma.FireExtinguisherUpdateManyMutationInput, Prisma.FireExtinguisherUncheckedUpdateManyWithoutCustomerInput>;
};
export type FireExtinguisherScalarWhereInput = {
    AND?: Prisma.FireExtinguisherScalarWhereInput | Prisma.FireExtinguisherScalarWhereInput[];
    OR?: Prisma.FireExtinguisherScalarWhereInput[];
    NOT?: Prisma.FireExtinguisherScalarWhereInput | Prisma.FireExtinguisherScalarWhereInput[];
    id?: Prisma.StringFilter<"FireExtinguisher"> | string;
    serialNumber?: Prisma.StringFilter<"FireExtinguisher"> | string;
    type?: Prisma.StringNullableFilter<"FireExtinguisher"> | string | null;
    capacity?: Prisma.StringNullableFilter<"FireExtinguisher"> | string | null;
    purchaseDate?: Prisma.DateTimeFilter<"FireExtinguisher"> | Date | string;
    expiryDate?: Prisma.DateTimeFilter<"FireExtinguisher"> | Date | string;
    status?: Prisma.EnumExtinguisherStatusFilter<"FireExtinguisher"> | $Enums.ExtinguisherStatus;
    customerId?: Prisma.StringFilter<"FireExtinguisher"> | string;
    createdAt?: Prisma.DateTimeFilter<"FireExtinguisher"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"FireExtinguisher"> | Date | string;
};
export type FireExtinguisherCreateWithoutNotificationsInput = {
    id?: string;
    serialNumber: string;
    type?: string | null;
    capacity?: string | null;
    purchaseDate: Date | string;
    expiryDate: Date | string;
    status?: $Enums.ExtinguisherStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    customer: Prisma.CustomerCreateNestedOneWithoutExtinguishersInput;
    escalations?: Prisma.EscalationCreateNestedManyWithoutExtinguisherInput;
};
export type FireExtinguisherUncheckedCreateWithoutNotificationsInput = {
    id?: string;
    serialNumber: string;
    type?: string | null;
    capacity?: string | null;
    purchaseDate: Date | string;
    expiryDate: Date | string;
    status?: $Enums.ExtinguisherStatus;
    customerId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    escalations?: Prisma.EscalationUncheckedCreateNestedManyWithoutExtinguisherInput;
};
export type FireExtinguisherCreateOrConnectWithoutNotificationsInput = {
    where: Prisma.FireExtinguisherWhereUniqueInput;
    create: Prisma.XOR<Prisma.FireExtinguisherCreateWithoutNotificationsInput, Prisma.FireExtinguisherUncheckedCreateWithoutNotificationsInput>;
};
export type FireExtinguisherUpsertWithoutNotificationsInput = {
    update: Prisma.XOR<Prisma.FireExtinguisherUpdateWithoutNotificationsInput, Prisma.FireExtinguisherUncheckedUpdateWithoutNotificationsInput>;
    create: Prisma.XOR<Prisma.FireExtinguisherCreateWithoutNotificationsInput, Prisma.FireExtinguisherUncheckedCreateWithoutNotificationsInput>;
    where?: Prisma.FireExtinguisherWhereInput;
};
export type FireExtinguisherUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: Prisma.FireExtinguisherWhereInput;
    data: Prisma.XOR<Prisma.FireExtinguisherUpdateWithoutNotificationsInput, Prisma.FireExtinguisherUncheckedUpdateWithoutNotificationsInput>;
};
export type FireExtinguisherUpdateWithoutNotificationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    serialNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacity?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumExtinguisherStatusFieldUpdateOperationsInput | $Enums.ExtinguisherStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customer?: Prisma.CustomerUpdateOneRequiredWithoutExtinguishersNestedInput;
    escalations?: Prisma.EscalationUpdateManyWithoutExtinguisherNestedInput;
};
export type FireExtinguisherUncheckedUpdateWithoutNotificationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    serialNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacity?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumExtinguisherStatusFieldUpdateOperationsInput | $Enums.ExtinguisherStatus;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    escalations?: Prisma.EscalationUncheckedUpdateManyWithoutExtinguisherNestedInput;
};
export type FireExtinguisherCreateWithoutEscalationsInput = {
    id?: string;
    serialNumber: string;
    type?: string | null;
    capacity?: string | null;
    purchaseDate: Date | string;
    expiryDate: Date | string;
    status?: $Enums.ExtinguisherStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    customer: Prisma.CustomerCreateNestedOneWithoutExtinguishersInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutExtinguisherInput;
};
export type FireExtinguisherUncheckedCreateWithoutEscalationsInput = {
    id?: string;
    serialNumber: string;
    type?: string | null;
    capacity?: string | null;
    purchaseDate: Date | string;
    expiryDate: Date | string;
    status?: $Enums.ExtinguisherStatus;
    customerId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutExtinguisherInput;
};
export type FireExtinguisherCreateOrConnectWithoutEscalationsInput = {
    where: Prisma.FireExtinguisherWhereUniqueInput;
    create: Prisma.XOR<Prisma.FireExtinguisherCreateWithoutEscalationsInput, Prisma.FireExtinguisherUncheckedCreateWithoutEscalationsInput>;
};
export type FireExtinguisherUpsertWithoutEscalationsInput = {
    update: Prisma.XOR<Prisma.FireExtinguisherUpdateWithoutEscalationsInput, Prisma.FireExtinguisherUncheckedUpdateWithoutEscalationsInput>;
    create: Prisma.XOR<Prisma.FireExtinguisherCreateWithoutEscalationsInput, Prisma.FireExtinguisherUncheckedCreateWithoutEscalationsInput>;
    where?: Prisma.FireExtinguisherWhereInput;
};
export type FireExtinguisherUpdateToOneWithWhereWithoutEscalationsInput = {
    where?: Prisma.FireExtinguisherWhereInput;
    data: Prisma.XOR<Prisma.FireExtinguisherUpdateWithoutEscalationsInput, Prisma.FireExtinguisherUncheckedUpdateWithoutEscalationsInput>;
};
export type FireExtinguisherUpdateWithoutEscalationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    serialNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacity?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumExtinguisherStatusFieldUpdateOperationsInput | $Enums.ExtinguisherStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customer?: Prisma.CustomerUpdateOneRequiredWithoutExtinguishersNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutExtinguisherNestedInput;
};
export type FireExtinguisherUncheckedUpdateWithoutEscalationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    serialNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacity?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumExtinguisherStatusFieldUpdateOperationsInput | $Enums.ExtinguisherStatus;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutExtinguisherNestedInput;
};
export type FireExtinguisherCreateManyCustomerInput = {
    id?: string;
    serialNumber: string;
    type?: string | null;
    capacity?: string | null;
    purchaseDate: Date | string;
    expiryDate: Date | string;
    status?: $Enums.ExtinguisherStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FireExtinguisherUpdateWithoutCustomerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    serialNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacity?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumExtinguisherStatusFieldUpdateOperationsInput | $Enums.ExtinguisherStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notifications?: Prisma.NotificationUpdateManyWithoutExtinguisherNestedInput;
    escalations?: Prisma.EscalationUpdateManyWithoutExtinguisherNestedInput;
};
export type FireExtinguisherUncheckedUpdateWithoutCustomerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    serialNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacity?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumExtinguisherStatusFieldUpdateOperationsInput | $Enums.ExtinguisherStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutExtinguisherNestedInput;
    escalations?: Prisma.EscalationUncheckedUpdateManyWithoutExtinguisherNestedInput;
};
export type FireExtinguisherUncheckedUpdateManyWithoutCustomerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    serialNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacity?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumExtinguisherStatusFieldUpdateOperationsInput | $Enums.ExtinguisherStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FireExtinguisherCountOutputType = {
    notifications: number;
    escalations: number;
};
export type FireExtinguisherCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    notifications?: boolean | FireExtinguisherCountOutputTypeCountNotificationsArgs;
    escalations?: boolean | FireExtinguisherCountOutputTypeCountEscalationsArgs;
};
export type FireExtinguisherCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FireExtinguisherCountOutputTypeSelect<ExtArgs> | null;
};
export type FireExtinguisherCountOutputTypeCountNotificationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationWhereInput;
};
export type FireExtinguisherCountOutputTypeCountEscalationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EscalationWhereInput;
};
export type FireExtinguisherSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    serialNumber?: boolean;
    type?: boolean;
    capacity?: boolean;
    purchaseDate?: boolean;
    expiryDate?: boolean;
    status?: boolean;
    customerId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    customer?: boolean | Prisma.CustomerDefaultArgs<ExtArgs>;
    notifications?: boolean | Prisma.FireExtinguisher$notificationsArgs<ExtArgs>;
    escalations?: boolean | Prisma.FireExtinguisher$escalationsArgs<ExtArgs>;
    _count?: boolean | Prisma.FireExtinguisherCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["fireExtinguisher"]>;
export type FireExtinguisherSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    serialNumber?: boolean;
    type?: boolean;
    capacity?: boolean;
    purchaseDate?: boolean;
    expiryDate?: boolean;
    status?: boolean;
    customerId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    customer?: boolean | Prisma.CustomerDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["fireExtinguisher"]>;
export type FireExtinguisherSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    serialNumber?: boolean;
    type?: boolean;
    capacity?: boolean;
    purchaseDate?: boolean;
    expiryDate?: boolean;
    status?: boolean;
    customerId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    customer?: boolean | Prisma.CustomerDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["fireExtinguisher"]>;
export type FireExtinguisherSelectScalar = {
    id?: boolean;
    serialNumber?: boolean;
    type?: boolean;
    capacity?: boolean;
    purchaseDate?: boolean;
    expiryDate?: boolean;
    status?: boolean;
    customerId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type FireExtinguisherOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "serialNumber" | "type" | "capacity" | "purchaseDate" | "expiryDate" | "status" | "customerId" | "createdAt" | "updatedAt", ExtArgs["result"]["fireExtinguisher"]>;
export type FireExtinguisherInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    customer?: boolean | Prisma.CustomerDefaultArgs<ExtArgs>;
    notifications?: boolean | Prisma.FireExtinguisher$notificationsArgs<ExtArgs>;
    escalations?: boolean | Prisma.FireExtinguisher$escalationsArgs<ExtArgs>;
    _count?: boolean | Prisma.FireExtinguisherCountOutputTypeDefaultArgs<ExtArgs>;
};
export type FireExtinguisherIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    customer?: boolean | Prisma.CustomerDefaultArgs<ExtArgs>;
};
export type FireExtinguisherIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    customer?: boolean | Prisma.CustomerDefaultArgs<ExtArgs>;
};
export type $FireExtinguisherPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "FireExtinguisher";
    objects: {
        customer: Prisma.$CustomerPayload<ExtArgs>;
        notifications: Prisma.$NotificationPayload<ExtArgs>[];
        escalations: Prisma.$EscalationPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        serialNumber: string;
        type: string | null;
        capacity: string | null;
        purchaseDate: Date;
        expiryDate: Date;
        status: $Enums.ExtinguisherStatus;
        customerId: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["fireExtinguisher"]>;
    composites: {};
};
export type FireExtinguisherGetPayload<S extends boolean | null | undefined | FireExtinguisherDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FireExtinguisherPayload, S>;
export type FireExtinguisherCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FireExtinguisherFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FireExtinguisherCountAggregateInputType | true;
};
export interface FireExtinguisherDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['FireExtinguisher'];
        meta: {
            name: 'FireExtinguisher';
        };
    };
    findUnique<T extends FireExtinguisherFindUniqueArgs>(args: Prisma.SelectSubset<T, FireExtinguisherFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FireExtinguisherClient<runtime.Types.Result.GetResult<Prisma.$FireExtinguisherPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends FireExtinguisherFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FireExtinguisherFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FireExtinguisherClient<runtime.Types.Result.GetResult<Prisma.$FireExtinguisherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends FireExtinguisherFindFirstArgs>(args?: Prisma.SelectSubset<T, FireExtinguisherFindFirstArgs<ExtArgs>>): Prisma.Prisma__FireExtinguisherClient<runtime.Types.Result.GetResult<Prisma.$FireExtinguisherPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends FireExtinguisherFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FireExtinguisherFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FireExtinguisherClient<runtime.Types.Result.GetResult<Prisma.$FireExtinguisherPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends FireExtinguisherFindManyArgs>(args?: Prisma.SelectSubset<T, FireExtinguisherFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FireExtinguisherPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends FireExtinguisherCreateArgs>(args: Prisma.SelectSubset<T, FireExtinguisherCreateArgs<ExtArgs>>): Prisma.Prisma__FireExtinguisherClient<runtime.Types.Result.GetResult<Prisma.$FireExtinguisherPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends FireExtinguisherCreateManyArgs>(args?: Prisma.SelectSubset<T, FireExtinguisherCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends FireExtinguisherCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FireExtinguisherCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FireExtinguisherPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends FireExtinguisherDeleteArgs>(args: Prisma.SelectSubset<T, FireExtinguisherDeleteArgs<ExtArgs>>): Prisma.Prisma__FireExtinguisherClient<runtime.Types.Result.GetResult<Prisma.$FireExtinguisherPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends FireExtinguisherUpdateArgs>(args: Prisma.SelectSubset<T, FireExtinguisherUpdateArgs<ExtArgs>>): Prisma.Prisma__FireExtinguisherClient<runtime.Types.Result.GetResult<Prisma.$FireExtinguisherPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends FireExtinguisherDeleteManyArgs>(args?: Prisma.SelectSubset<T, FireExtinguisherDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends FireExtinguisherUpdateManyArgs>(args: Prisma.SelectSubset<T, FireExtinguisherUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends FireExtinguisherUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FireExtinguisherUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FireExtinguisherPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends FireExtinguisherUpsertArgs>(args: Prisma.SelectSubset<T, FireExtinguisherUpsertArgs<ExtArgs>>): Prisma.Prisma__FireExtinguisherClient<runtime.Types.Result.GetResult<Prisma.$FireExtinguisherPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends FireExtinguisherCountArgs>(args?: Prisma.Subset<T, FireExtinguisherCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FireExtinguisherCountAggregateOutputType> : number>;
    aggregate<T extends FireExtinguisherAggregateArgs>(args: Prisma.Subset<T, FireExtinguisherAggregateArgs>): Prisma.PrismaPromise<GetFireExtinguisherAggregateType<T>>;
    groupBy<T extends FireExtinguisherGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FireExtinguisherGroupByArgs['orderBy'];
    } : {
        orderBy?: FireExtinguisherGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FireExtinguisherGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFireExtinguisherGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: FireExtinguisherFieldRefs;
}
export interface Prisma__FireExtinguisherClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    customer<T extends Prisma.CustomerDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CustomerDefaultArgs<ExtArgs>>): Prisma.Prisma__CustomerClient<runtime.Types.Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    notifications<T extends Prisma.FireExtinguisher$notificationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FireExtinguisher$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    escalations<T extends Prisma.FireExtinguisher$escalationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FireExtinguisher$escalationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EscalationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface FireExtinguisherFieldRefs {
    readonly id: Prisma.FieldRef<"FireExtinguisher", 'String'>;
    readonly serialNumber: Prisma.FieldRef<"FireExtinguisher", 'String'>;
    readonly type: Prisma.FieldRef<"FireExtinguisher", 'String'>;
    readonly capacity: Prisma.FieldRef<"FireExtinguisher", 'String'>;
    readonly purchaseDate: Prisma.FieldRef<"FireExtinguisher", 'DateTime'>;
    readonly expiryDate: Prisma.FieldRef<"FireExtinguisher", 'DateTime'>;
    readonly status: Prisma.FieldRef<"FireExtinguisher", 'ExtinguisherStatus'>;
    readonly customerId: Prisma.FieldRef<"FireExtinguisher", 'String'>;
    readonly createdAt: Prisma.FieldRef<"FireExtinguisher", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"FireExtinguisher", 'DateTime'>;
}
export type FireExtinguisherFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FireExtinguisherSelect<ExtArgs> | null;
    omit?: Prisma.FireExtinguisherOmit<ExtArgs> | null;
    include?: Prisma.FireExtinguisherInclude<ExtArgs> | null;
    where: Prisma.FireExtinguisherWhereUniqueInput;
};
export type FireExtinguisherFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FireExtinguisherSelect<ExtArgs> | null;
    omit?: Prisma.FireExtinguisherOmit<ExtArgs> | null;
    include?: Prisma.FireExtinguisherInclude<ExtArgs> | null;
    where: Prisma.FireExtinguisherWhereUniqueInput;
};
export type FireExtinguisherFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FireExtinguisherFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FireExtinguisherFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FireExtinguisherCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FireExtinguisherSelect<ExtArgs> | null;
    omit?: Prisma.FireExtinguisherOmit<ExtArgs> | null;
    include?: Prisma.FireExtinguisherInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FireExtinguisherCreateInput, Prisma.FireExtinguisherUncheckedCreateInput>;
};
export type FireExtinguisherCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.FireExtinguisherCreateManyInput | Prisma.FireExtinguisherCreateManyInput[];
    skipDuplicates?: boolean;
};
export type FireExtinguisherCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FireExtinguisherSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FireExtinguisherOmit<ExtArgs> | null;
    data: Prisma.FireExtinguisherCreateManyInput | Prisma.FireExtinguisherCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.FireExtinguisherIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type FireExtinguisherUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FireExtinguisherSelect<ExtArgs> | null;
    omit?: Prisma.FireExtinguisherOmit<ExtArgs> | null;
    include?: Prisma.FireExtinguisherInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FireExtinguisherUpdateInput, Prisma.FireExtinguisherUncheckedUpdateInput>;
    where: Prisma.FireExtinguisherWhereUniqueInput;
};
export type FireExtinguisherUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.FireExtinguisherUpdateManyMutationInput, Prisma.FireExtinguisherUncheckedUpdateManyInput>;
    where?: Prisma.FireExtinguisherWhereInput;
    limit?: number;
};
export type FireExtinguisherUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FireExtinguisherSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FireExtinguisherOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FireExtinguisherUpdateManyMutationInput, Prisma.FireExtinguisherUncheckedUpdateManyInput>;
    where?: Prisma.FireExtinguisherWhereInput;
    limit?: number;
    include?: Prisma.FireExtinguisherIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type FireExtinguisherUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FireExtinguisherSelect<ExtArgs> | null;
    omit?: Prisma.FireExtinguisherOmit<ExtArgs> | null;
    include?: Prisma.FireExtinguisherInclude<ExtArgs> | null;
    where: Prisma.FireExtinguisherWhereUniqueInput;
    create: Prisma.XOR<Prisma.FireExtinguisherCreateInput, Prisma.FireExtinguisherUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.FireExtinguisherUpdateInput, Prisma.FireExtinguisherUncheckedUpdateInput>;
};
export type FireExtinguisherDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FireExtinguisherSelect<ExtArgs> | null;
    omit?: Prisma.FireExtinguisherOmit<ExtArgs> | null;
    include?: Prisma.FireExtinguisherInclude<ExtArgs> | null;
    where: Prisma.FireExtinguisherWhereUniqueInput;
};
export type FireExtinguisherDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FireExtinguisherWhereInput;
    limit?: number;
};
export type FireExtinguisher$notificationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FireExtinguisher$escalationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FireExtinguisherDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FireExtinguisherSelect<ExtArgs> | null;
    omit?: Prisma.FireExtinguisherOmit<ExtArgs> | null;
    include?: Prisma.FireExtinguisherInclude<ExtArgs> | null;
};
