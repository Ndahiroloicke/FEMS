import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type EscalationModel = runtime.Types.Result.DefaultSelection<Prisma.$EscalationPayload>;
export type AggregateEscalation = {
    _count: EscalationCountAggregateOutputType | null;
    _min: EscalationMinAggregateOutputType | null;
    _max: EscalationMaxAggregateOutputType | null;
};
export type EscalationMinAggregateOutputType = {
    id: string | null;
    reason: string | null;
    status: $Enums.EscalationStatus | null;
    reportedAt: Date | null;
    resolvedAt: Date | null;
    notes: string | null;
    customerId: string | null;
    extinguisherId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type EscalationMaxAggregateOutputType = {
    id: string | null;
    reason: string | null;
    status: $Enums.EscalationStatus | null;
    reportedAt: Date | null;
    resolvedAt: Date | null;
    notes: string | null;
    customerId: string | null;
    extinguisherId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type EscalationCountAggregateOutputType = {
    id: number;
    reason: number;
    status: number;
    reportedAt: number;
    resolvedAt: number;
    notes: number;
    customerId: number;
    extinguisherId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type EscalationMinAggregateInputType = {
    id?: true;
    reason?: true;
    status?: true;
    reportedAt?: true;
    resolvedAt?: true;
    notes?: true;
    customerId?: true;
    extinguisherId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type EscalationMaxAggregateInputType = {
    id?: true;
    reason?: true;
    status?: true;
    reportedAt?: true;
    resolvedAt?: true;
    notes?: true;
    customerId?: true;
    extinguisherId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type EscalationCountAggregateInputType = {
    id?: true;
    reason?: true;
    status?: true;
    reportedAt?: true;
    resolvedAt?: true;
    notes?: true;
    customerId?: true;
    extinguisherId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type EscalationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EscalationWhereInput;
    orderBy?: Prisma.EscalationOrderByWithRelationInput | Prisma.EscalationOrderByWithRelationInput[];
    cursor?: Prisma.EscalationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | EscalationCountAggregateInputType;
    _min?: EscalationMinAggregateInputType;
    _max?: EscalationMaxAggregateInputType;
};
export type GetEscalationAggregateType<T extends EscalationAggregateArgs> = {
    [P in keyof T & keyof AggregateEscalation]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEscalation[P]> : Prisma.GetScalarType<T[P], AggregateEscalation[P]>;
};
export type EscalationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EscalationWhereInput;
    orderBy?: Prisma.EscalationOrderByWithAggregationInput | Prisma.EscalationOrderByWithAggregationInput[];
    by: Prisma.EscalationScalarFieldEnum[] | Prisma.EscalationScalarFieldEnum;
    having?: Prisma.EscalationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: EscalationCountAggregateInputType | true;
    _min?: EscalationMinAggregateInputType;
    _max?: EscalationMaxAggregateInputType;
};
export type EscalationGroupByOutputType = {
    id: string;
    reason: string;
    status: $Enums.EscalationStatus;
    reportedAt: Date | null;
    resolvedAt: Date | null;
    notes: string | null;
    customerId: string;
    extinguisherId: string;
    createdAt: Date;
    updatedAt: Date;
    _count: EscalationCountAggregateOutputType | null;
    _min: EscalationMinAggregateOutputType | null;
    _max: EscalationMaxAggregateOutputType | null;
};
export type GetEscalationGroupByPayload<T extends EscalationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<EscalationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof EscalationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], EscalationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], EscalationGroupByOutputType[P]>;
}>>;
export type EscalationWhereInput = {
    AND?: Prisma.EscalationWhereInput | Prisma.EscalationWhereInput[];
    OR?: Prisma.EscalationWhereInput[];
    NOT?: Prisma.EscalationWhereInput | Prisma.EscalationWhereInput[];
    id?: Prisma.StringFilter<"Escalation"> | string;
    reason?: Prisma.StringFilter<"Escalation"> | string;
    status?: Prisma.EnumEscalationStatusFilter<"Escalation"> | $Enums.EscalationStatus;
    reportedAt?: Prisma.DateTimeNullableFilter<"Escalation"> | Date | string | null;
    resolvedAt?: Prisma.DateTimeNullableFilter<"Escalation"> | Date | string | null;
    notes?: Prisma.StringNullableFilter<"Escalation"> | string | null;
    customerId?: Prisma.StringFilter<"Escalation"> | string;
    extinguisherId?: Prisma.StringFilter<"Escalation"> | string;
    createdAt?: Prisma.DateTimeFilter<"Escalation"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Escalation"> | Date | string;
    customer?: Prisma.XOR<Prisma.CustomerScalarRelationFilter, Prisma.CustomerWhereInput>;
    extinguisher?: Prisma.XOR<Prisma.FireExtinguisherScalarRelationFilter, Prisma.FireExtinguisherWhereInput>;
};
export type EscalationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reportedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    extinguisherId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    customer?: Prisma.CustomerOrderByWithRelationInput;
    extinguisher?: Prisma.FireExtinguisherOrderByWithRelationInput;
};
export type EscalationWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.EscalationWhereInput | Prisma.EscalationWhereInput[];
    OR?: Prisma.EscalationWhereInput[];
    NOT?: Prisma.EscalationWhereInput | Prisma.EscalationWhereInput[];
    reason?: Prisma.StringFilter<"Escalation"> | string;
    status?: Prisma.EnumEscalationStatusFilter<"Escalation"> | $Enums.EscalationStatus;
    reportedAt?: Prisma.DateTimeNullableFilter<"Escalation"> | Date | string | null;
    resolvedAt?: Prisma.DateTimeNullableFilter<"Escalation"> | Date | string | null;
    notes?: Prisma.StringNullableFilter<"Escalation"> | string | null;
    customerId?: Prisma.StringFilter<"Escalation"> | string;
    extinguisherId?: Prisma.StringFilter<"Escalation"> | string;
    createdAt?: Prisma.DateTimeFilter<"Escalation"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Escalation"> | Date | string;
    customer?: Prisma.XOR<Prisma.CustomerScalarRelationFilter, Prisma.CustomerWhereInput>;
    extinguisher?: Prisma.XOR<Prisma.FireExtinguisherScalarRelationFilter, Prisma.FireExtinguisherWhereInput>;
}, "id">;
export type EscalationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reportedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    extinguisherId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.EscalationCountOrderByAggregateInput;
    _max?: Prisma.EscalationMaxOrderByAggregateInput;
    _min?: Prisma.EscalationMinOrderByAggregateInput;
};
export type EscalationScalarWhereWithAggregatesInput = {
    AND?: Prisma.EscalationScalarWhereWithAggregatesInput | Prisma.EscalationScalarWhereWithAggregatesInput[];
    OR?: Prisma.EscalationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.EscalationScalarWhereWithAggregatesInput | Prisma.EscalationScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Escalation"> | string;
    reason?: Prisma.StringWithAggregatesFilter<"Escalation"> | string;
    status?: Prisma.EnumEscalationStatusWithAggregatesFilter<"Escalation"> | $Enums.EscalationStatus;
    reportedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Escalation"> | Date | string | null;
    resolvedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Escalation"> | Date | string | null;
    notes?: Prisma.StringNullableWithAggregatesFilter<"Escalation"> | string | null;
    customerId?: Prisma.StringWithAggregatesFilter<"Escalation"> | string;
    extinguisherId?: Prisma.StringWithAggregatesFilter<"Escalation"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Escalation"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Escalation"> | Date | string;
};
export type EscalationCreateInput = {
    id?: string;
    reason: string;
    status?: $Enums.EscalationStatus;
    reportedAt?: Date | string | null;
    resolvedAt?: Date | string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    customer: Prisma.CustomerCreateNestedOneWithoutEscalationsInput;
    extinguisher: Prisma.FireExtinguisherCreateNestedOneWithoutEscalationsInput;
};
export type EscalationUncheckedCreateInput = {
    id?: string;
    reason: string;
    status?: $Enums.EscalationStatus;
    reportedAt?: Date | string | null;
    resolvedAt?: Date | string | null;
    notes?: string | null;
    customerId: string;
    extinguisherId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EscalationUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumEscalationStatusFieldUpdateOperationsInput | $Enums.EscalationStatus;
    reportedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customer?: Prisma.CustomerUpdateOneRequiredWithoutEscalationsNestedInput;
    extinguisher?: Prisma.FireExtinguisherUpdateOneRequiredWithoutEscalationsNestedInput;
};
export type EscalationUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumEscalationStatusFieldUpdateOperationsInput | $Enums.EscalationStatus;
    reportedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    extinguisherId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EscalationCreateManyInput = {
    id?: string;
    reason: string;
    status?: $Enums.EscalationStatus;
    reportedAt?: Date | string | null;
    resolvedAt?: Date | string | null;
    notes?: string | null;
    customerId: string;
    extinguisherId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EscalationUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumEscalationStatusFieldUpdateOperationsInput | $Enums.EscalationStatus;
    reportedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EscalationUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumEscalationStatusFieldUpdateOperationsInput | $Enums.EscalationStatus;
    reportedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    extinguisherId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EscalationListRelationFilter = {
    every?: Prisma.EscalationWhereInput;
    some?: Prisma.EscalationWhereInput;
    none?: Prisma.EscalationWhereInput;
};
export type EscalationOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type EscalationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reportedAt?: Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    extinguisherId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type EscalationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reportedAt?: Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    extinguisherId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type EscalationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reportedAt?: Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    extinguisherId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type EscalationCreateNestedManyWithoutCustomerInput = {
    create?: Prisma.XOR<Prisma.EscalationCreateWithoutCustomerInput, Prisma.EscalationUncheckedCreateWithoutCustomerInput> | Prisma.EscalationCreateWithoutCustomerInput[] | Prisma.EscalationUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.EscalationCreateOrConnectWithoutCustomerInput | Prisma.EscalationCreateOrConnectWithoutCustomerInput[];
    createMany?: Prisma.EscalationCreateManyCustomerInputEnvelope;
    connect?: Prisma.EscalationWhereUniqueInput | Prisma.EscalationWhereUniqueInput[];
};
export type EscalationUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: Prisma.XOR<Prisma.EscalationCreateWithoutCustomerInput, Prisma.EscalationUncheckedCreateWithoutCustomerInput> | Prisma.EscalationCreateWithoutCustomerInput[] | Prisma.EscalationUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.EscalationCreateOrConnectWithoutCustomerInput | Prisma.EscalationCreateOrConnectWithoutCustomerInput[];
    createMany?: Prisma.EscalationCreateManyCustomerInputEnvelope;
    connect?: Prisma.EscalationWhereUniqueInput | Prisma.EscalationWhereUniqueInput[];
};
export type EscalationUpdateManyWithoutCustomerNestedInput = {
    create?: Prisma.XOR<Prisma.EscalationCreateWithoutCustomerInput, Prisma.EscalationUncheckedCreateWithoutCustomerInput> | Prisma.EscalationCreateWithoutCustomerInput[] | Prisma.EscalationUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.EscalationCreateOrConnectWithoutCustomerInput | Prisma.EscalationCreateOrConnectWithoutCustomerInput[];
    upsert?: Prisma.EscalationUpsertWithWhereUniqueWithoutCustomerInput | Prisma.EscalationUpsertWithWhereUniqueWithoutCustomerInput[];
    createMany?: Prisma.EscalationCreateManyCustomerInputEnvelope;
    set?: Prisma.EscalationWhereUniqueInput | Prisma.EscalationWhereUniqueInput[];
    disconnect?: Prisma.EscalationWhereUniqueInput | Prisma.EscalationWhereUniqueInput[];
    delete?: Prisma.EscalationWhereUniqueInput | Prisma.EscalationWhereUniqueInput[];
    connect?: Prisma.EscalationWhereUniqueInput | Prisma.EscalationWhereUniqueInput[];
    update?: Prisma.EscalationUpdateWithWhereUniqueWithoutCustomerInput | Prisma.EscalationUpdateWithWhereUniqueWithoutCustomerInput[];
    updateMany?: Prisma.EscalationUpdateManyWithWhereWithoutCustomerInput | Prisma.EscalationUpdateManyWithWhereWithoutCustomerInput[];
    deleteMany?: Prisma.EscalationScalarWhereInput | Prisma.EscalationScalarWhereInput[];
};
export type EscalationUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: Prisma.XOR<Prisma.EscalationCreateWithoutCustomerInput, Prisma.EscalationUncheckedCreateWithoutCustomerInput> | Prisma.EscalationCreateWithoutCustomerInput[] | Prisma.EscalationUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.EscalationCreateOrConnectWithoutCustomerInput | Prisma.EscalationCreateOrConnectWithoutCustomerInput[];
    upsert?: Prisma.EscalationUpsertWithWhereUniqueWithoutCustomerInput | Prisma.EscalationUpsertWithWhereUniqueWithoutCustomerInput[];
    createMany?: Prisma.EscalationCreateManyCustomerInputEnvelope;
    set?: Prisma.EscalationWhereUniqueInput | Prisma.EscalationWhereUniqueInput[];
    disconnect?: Prisma.EscalationWhereUniqueInput | Prisma.EscalationWhereUniqueInput[];
    delete?: Prisma.EscalationWhereUniqueInput | Prisma.EscalationWhereUniqueInput[];
    connect?: Prisma.EscalationWhereUniqueInput | Prisma.EscalationWhereUniqueInput[];
    update?: Prisma.EscalationUpdateWithWhereUniqueWithoutCustomerInput | Prisma.EscalationUpdateWithWhereUniqueWithoutCustomerInput[];
    updateMany?: Prisma.EscalationUpdateManyWithWhereWithoutCustomerInput | Prisma.EscalationUpdateManyWithWhereWithoutCustomerInput[];
    deleteMany?: Prisma.EscalationScalarWhereInput | Prisma.EscalationScalarWhereInput[];
};
export type EscalationCreateNestedManyWithoutExtinguisherInput = {
    create?: Prisma.XOR<Prisma.EscalationCreateWithoutExtinguisherInput, Prisma.EscalationUncheckedCreateWithoutExtinguisherInput> | Prisma.EscalationCreateWithoutExtinguisherInput[] | Prisma.EscalationUncheckedCreateWithoutExtinguisherInput[];
    connectOrCreate?: Prisma.EscalationCreateOrConnectWithoutExtinguisherInput | Prisma.EscalationCreateOrConnectWithoutExtinguisherInput[];
    createMany?: Prisma.EscalationCreateManyExtinguisherInputEnvelope;
    connect?: Prisma.EscalationWhereUniqueInput | Prisma.EscalationWhereUniqueInput[];
};
export type EscalationUncheckedCreateNestedManyWithoutExtinguisherInput = {
    create?: Prisma.XOR<Prisma.EscalationCreateWithoutExtinguisherInput, Prisma.EscalationUncheckedCreateWithoutExtinguisherInput> | Prisma.EscalationCreateWithoutExtinguisherInput[] | Prisma.EscalationUncheckedCreateWithoutExtinguisherInput[];
    connectOrCreate?: Prisma.EscalationCreateOrConnectWithoutExtinguisherInput | Prisma.EscalationCreateOrConnectWithoutExtinguisherInput[];
    createMany?: Prisma.EscalationCreateManyExtinguisherInputEnvelope;
    connect?: Prisma.EscalationWhereUniqueInput | Prisma.EscalationWhereUniqueInput[];
};
export type EscalationUpdateManyWithoutExtinguisherNestedInput = {
    create?: Prisma.XOR<Prisma.EscalationCreateWithoutExtinguisherInput, Prisma.EscalationUncheckedCreateWithoutExtinguisherInput> | Prisma.EscalationCreateWithoutExtinguisherInput[] | Prisma.EscalationUncheckedCreateWithoutExtinguisherInput[];
    connectOrCreate?: Prisma.EscalationCreateOrConnectWithoutExtinguisherInput | Prisma.EscalationCreateOrConnectWithoutExtinguisherInput[];
    upsert?: Prisma.EscalationUpsertWithWhereUniqueWithoutExtinguisherInput | Prisma.EscalationUpsertWithWhereUniqueWithoutExtinguisherInput[];
    createMany?: Prisma.EscalationCreateManyExtinguisherInputEnvelope;
    set?: Prisma.EscalationWhereUniqueInput | Prisma.EscalationWhereUniqueInput[];
    disconnect?: Prisma.EscalationWhereUniqueInput | Prisma.EscalationWhereUniqueInput[];
    delete?: Prisma.EscalationWhereUniqueInput | Prisma.EscalationWhereUniqueInput[];
    connect?: Prisma.EscalationWhereUniqueInput | Prisma.EscalationWhereUniqueInput[];
    update?: Prisma.EscalationUpdateWithWhereUniqueWithoutExtinguisherInput | Prisma.EscalationUpdateWithWhereUniqueWithoutExtinguisherInput[];
    updateMany?: Prisma.EscalationUpdateManyWithWhereWithoutExtinguisherInput | Prisma.EscalationUpdateManyWithWhereWithoutExtinguisherInput[];
    deleteMany?: Prisma.EscalationScalarWhereInput | Prisma.EscalationScalarWhereInput[];
};
export type EscalationUncheckedUpdateManyWithoutExtinguisherNestedInput = {
    create?: Prisma.XOR<Prisma.EscalationCreateWithoutExtinguisherInput, Prisma.EscalationUncheckedCreateWithoutExtinguisherInput> | Prisma.EscalationCreateWithoutExtinguisherInput[] | Prisma.EscalationUncheckedCreateWithoutExtinguisherInput[];
    connectOrCreate?: Prisma.EscalationCreateOrConnectWithoutExtinguisherInput | Prisma.EscalationCreateOrConnectWithoutExtinguisherInput[];
    upsert?: Prisma.EscalationUpsertWithWhereUniqueWithoutExtinguisherInput | Prisma.EscalationUpsertWithWhereUniqueWithoutExtinguisherInput[];
    createMany?: Prisma.EscalationCreateManyExtinguisherInputEnvelope;
    set?: Prisma.EscalationWhereUniqueInput | Prisma.EscalationWhereUniqueInput[];
    disconnect?: Prisma.EscalationWhereUniqueInput | Prisma.EscalationWhereUniqueInput[];
    delete?: Prisma.EscalationWhereUniqueInput | Prisma.EscalationWhereUniqueInput[];
    connect?: Prisma.EscalationWhereUniqueInput | Prisma.EscalationWhereUniqueInput[];
    update?: Prisma.EscalationUpdateWithWhereUniqueWithoutExtinguisherInput | Prisma.EscalationUpdateWithWhereUniqueWithoutExtinguisherInput[];
    updateMany?: Prisma.EscalationUpdateManyWithWhereWithoutExtinguisherInput | Prisma.EscalationUpdateManyWithWhereWithoutExtinguisherInput[];
    deleteMany?: Prisma.EscalationScalarWhereInput | Prisma.EscalationScalarWhereInput[];
};
export type EnumEscalationStatusFieldUpdateOperationsInput = {
    set?: $Enums.EscalationStatus;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type EscalationCreateWithoutCustomerInput = {
    id?: string;
    reason: string;
    status?: $Enums.EscalationStatus;
    reportedAt?: Date | string | null;
    resolvedAt?: Date | string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    extinguisher: Prisma.FireExtinguisherCreateNestedOneWithoutEscalationsInput;
};
export type EscalationUncheckedCreateWithoutCustomerInput = {
    id?: string;
    reason: string;
    status?: $Enums.EscalationStatus;
    reportedAt?: Date | string | null;
    resolvedAt?: Date | string | null;
    notes?: string | null;
    extinguisherId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EscalationCreateOrConnectWithoutCustomerInput = {
    where: Prisma.EscalationWhereUniqueInput;
    create: Prisma.XOR<Prisma.EscalationCreateWithoutCustomerInput, Prisma.EscalationUncheckedCreateWithoutCustomerInput>;
};
export type EscalationCreateManyCustomerInputEnvelope = {
    data: Prisma.EscalationCreateManyCustomerInput | Prisma.EscalationCreateManyCustomerInput[];
    skipDuplicates?: boolean;
};
export type EscalationUpsertWithWhereUniqueWithoutCustomerInput = {
    where: Prisma.EscalationWhereUniqueInput;
    update: Prisma.XOR<Prisma.EscalationUpdateWithoutCustomerInput, Prisma.EscalationUncheckedUpdateWithoutCustomerInput>;
    create: Prisma.XOR<Prisma.EscalationCreateWithoutCustomerInput, Prisma.EscalationUncheckedCreateWithoutCustomerInput>;
};
export type EscalationUpdateWithWhereUniqueWithoutCustomerInput = {
    where: Prisma.EscalationWhereUniqueInput;
    data: Prisma.XOR<Prisma.EscalationUpdateWithoutCustomerInput, Prisma.EscalationUncheckedUpdateWithoutCustomerInput>;
};
export type EscalationUpdateManyWithWhereWithoutCustomerInput = {
    where: Prisma.EscalationScalarWhereInput;
    data: Prisma.XOR<Prisma.EscalationUpdateManyMutationInput, Prisma.EscalationUncheckedUpdateManyWithoutCustomerInput>;
};
export type EscalationScalarWhereInput = {
    AND?: Prisma.EscalationScalarWhereInput | Prisma.EscalationScalarWhereInput[];
    OR?: Prisma.EscalationScalarWhereInput[];
    NOT?: Prisma.EscalationScalarWhereInput | Prisma.EscalationScalarWhereInput[];
    id?: Prisma.StringFilter<"Escalation"> | string;
    reason?: Prisma.StringFilter<"Escalation"> | string;
    status?: Prisma.EnumEscalationStatusFilter<"Escalation"> | $Enums.EscalationStatus;
    reportedAt?: Prisma.DateTimeNullableFilter<"Escalation"> | Date | string | null;
    resolvedAt?: Prisma.DateTimeNullableFilter<"Escalation"> | Date | string | null;
    notes?: Prisma.StringNullableFilter<"Escalation"> | string | null;
    customerId?: Prisma.StringFilter<"Escalation"> | string;
    extinguisherId?: Prisma.StringFilter<"Escalation"> | string;
    createdAt?: Prisma.DateTimeFilter<"Escalation"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Escalation"> | Date | string;
};
export type EscalationCreateWithoutExtinguisherInput = {
    id?: string;
    reason: string;
    status?: $Enums.EscalationStatus;
    reportedAt?: Date | string | null;
    resolvedAt?: Date | string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    customer: Prisma.CustomerCreateNestedOneWithoutEscalationsInput;
};
export type EscalationUncheckedCreateWithoutExtinguisherInput = {
    id?: string;
    reason: string;
    status?: $Enums.EscalationStatus;
    reportedAt?: Date | string | null;
    resolvedAt?: Date | string | null;
    notes?: string | null;
    customerId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EscalationCreateOrConnectWithoutExtinguisherInput = {
    where: Prisma.EscalationWhereUniqueInput;
    create: Prisma.XOR<Prisma.EscalationCreateWithoutExtinguisherInput, Prisma.EscalationUncheckedCreateWithoutExtinguisherInput>;
};
export type EscalationCreateManyExtinguisherInputEnvelope = {
    data: Prisma.EscalationCreateManyExtinguisherInput | Prisma.EscalationCreateManyExtinguisherInput[];
    skipDuplicates?: boolean;
};
export type EscalationUpsertWithWhereUniqueWithoutExtinguisherInput = {
    where: Prisma.EscalationWhereUniqueInput;
    update: Prisma.XOR<Prisma.EscalationUpdateWithoutExtinguisherInput, Prisma.EscalationUncheckedUpdateWithoutExtinguisherInput>;
    create: Prisma.XOR<Prisma.EscalationCreateWithoutExtinguisherInput, Prisma.EscalationUncheckedCreateWithoutExtinguisherInput>;
};
export type EscalationUpdateWithWhereUniqueWithoutExtinguisherInput = {
    where: Prisma.EscalationWhereUniqueInput;
    data: Prisma.XOR<Prisma.EscalationUpdateWithoutExtinguisherInput, Prisma.EscalationUncheckedUpdateWithoutExtinguisherInput>;
};
export type EscalationUpdateManyWithWhereWithoutExtinguisherInput = {
    where: Prisma.EscalationScalarWhereInput;
    data: Prisma.XOR<Prisma.EscalationUpdateManyMutationInput, Prisma.EscalationUncheckedUpdateManyWithoutExtinguisherInput>;
};
export type EscalationCreateManyCustomerInput = {
    id?: string;
    reason: string;
    status?: $Enums.EscalationStatus;
    reportedAt?: Date | string | null;
    resolvedAt?: Date | string | null;
    notes?: string | null;
    extinguisherId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EscalationUpdateWithoutCustomerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumEscalationStatusFieldUpdateOperationsInput | $Enums.EscalationStatus;
    reportedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    extinguisher?: Prisma.FireExtinguisherUpdateOneRequiredWithoutEscalationsNestedInput;
};
export type EscalationUncheckedUpdateWithoutCustomerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumEscalationStatusFieldUpdateOperationsInput | $Enums.EscalationStatus;
    reportedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    extinguisherId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EscalationUncheckedUpdateManyWithoutCustomerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumEscalationStatusFieldUpdateOperationsInput | $Enums.EscalationStatus;
    reportedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    extinguisherId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EscalationCreateManyExtinguisherInput = {
    id?: string;
    reason: string;
    status?: $Enums.EscalationStatus;
    reportedAt?: Date | string | null;
    resolvedAt?: Date | string | null;
    notes?: string | null;
    customerId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EscalationUpdateWithoutExtinguisherInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumEscalationStatusFieldUpdateOperationsInput | $Enums.EscalationStatus;
    reportedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customer?: Prisma.CustomerUpdateOneRequiredWithoutEscalationsNestedInput;
};
export type EscalationUncheckedUpdateWithoutExtinguisherInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumEscalationStatusFieldUpdateOperationsInput | $Enums.EscalationStatus;
    reportedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EscalationUncheckedUpdateManyWithoutExtinguisherInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumEscalationStatusFieldUpdateOperationsInput | $Enums.EscalationStatus;
    reportedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EscalationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    reason?: boolean;
    status?: boolean;
    reportedAt?: boolean;
    resolvedAt?: boolean;
    notes?: boolean;
    customerId?: boolean;
    extinguisherId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    customer?: boolean | Prisma.CustomerDefaultArgs<ExtArgs>;
    extinguisher?: boolean | Prisma.FireExtinguisherDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["escalation"]>;
export type EscalationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    reason?: boolean;
    status?: boolean;
    reportedAt?: boolean;
    resolvedAt?: boolean;
    notes?: boolean;
    customerId?: boolean;
    extinguisherId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    customer?: boolean | Prisma.CustomerDefaultArgs<ExtArgs>;
    extinguisher?: boolean | Prisma.FireExtinguisherDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["escalation"]>;
export type EscalationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    reason?: boolean;
    status?: boolean;
    reportedAt?: boolean;
    resolvedAt?: boolean;
    notes?: boolean;
    customerId?: boolean;
    extinguisherId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    customer?: boolean | Prisma.CustomerDefaultArgs<ExtArgs>;
    extinguisher?: boolean | Prisma.FireExtinguisherDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["escalation"]>;
export type EscalationSelectScalar = {
    id?: boolean;
    reason?: boolean;
    status?: boolean;
    reportedAt?: boolean;
    resolvedAt?: boolean;
    notes?: boolean;
    customerId?: boolean;
    extinguisherId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type EscalationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "reason" | "status" | "reportedAt" | "resolvedAt" | "notes" | "customerId" | "extinguisherId" | "createdAt" | "updatedAt", ExtArgs["result"]["escalation"]>;
export type EscalationInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    customer?: boolean | Prisma.CustomerDefaultArgs<ExtArgs>;
    extinguisher?: boolean | Prisma.FireExtinguisherDefaultArgs<ExtArgs>;
};
export type EscalationIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    customer?: boolean | Prisma.CustomerDefaultArgs<ExtArgs>;
    extinguisher?: boolean | Prisma.FireExtinguisherDefaultArgs<ExtArgs>;
};
export type EscalationIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    customer?: boolean | Prisma.CustomerDefaultArgs<ExtArgs>;
    extinguisher?: boolean | Prisma.FireExtinguisherDefaultArgs<ExtArgs>;
};
export type $EscalationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Escalation";
    objects: {
        customer: Prisma.$CustomerPayload<ExtArgs>;
        extinguisher: Prisma.$FireExtinguisherPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        reason: string;
        status: $Enums.EscalationStatus;
        reportedAt: Date | null;
        resolvedAt: Date | null;
        notes: string | null;
        customerId: string;
        extinguisherId: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["escalation"]>;
    composites: {};
};
export type EscalationGetPayload<S extends boolean | null | undefined | EscalationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$EscalationPayload, S>;
export type EscalationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<EscalationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: EscalationCountAggregateInputType | true;
};
export interface EscalationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Escalation'];
        meta: {
            name: 'Escalation';
        };
    };
    findUnique<T extends EscalationFindUniqueArgs>(args: Prisma.SelectSubset<T, EscalationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__EscalationClient<runtime.Types.Result.GetResult<Prisma.$EscalationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends EscalationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, EscalationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__EscalationClient<runtime.Types.Result.GetResult<Prisma.$EscalationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends EscalationFindFirstArgs>(args?: Prisma.SelectSubset<T, EscalationFindFirstArgs<ExtArgs>>): Prisma.Prisma__EscalationClient<runtime.Types.Result.GetResult<Prisma.$EscalationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends EscalationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, EscalationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__EscalationClient<runtime.Types.Result.GetResult<Prisma.$EscalationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends EscalationFindManyArgs>(args?: Prisma.SelectSubset<T, EscalationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EscalationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends EscalationCreateArgs>(args: Prisma.SelectSubset<T, EscalationCreateArgs<ExtArgs>>): Prisma.Prisma__EscalationClient<runtime.Types.Result.GetResult<Prisma.$EscalationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends EscalationCreateManyArgs>(args?: Prisma.SelectSubset<T, EscalationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends EscalationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, EscalationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EscalationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends EscalationDeleteArgs>(args: Prisma.SelectSubset<T, EscalationDeleteArgs<ExtArgs>>): Prisma.Prisma__EscalationClient<runtime.Types.Result.GetResult<Prisma.$EscalationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends EscalationUpdateArgs>(args: Prisma.SelectSubset<T, EscalationUpdateArgs<ExtArgs>>): Prisma.Prisma__EscalationClient<runtime.Types.Result.GetResult<Prisma.$EscalationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends EscalationDeleteManyArgs>(args?: Prisma.SelectSubset<T, EscalationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends EscalationUpdateManyArgs>(args: Prisma.SelectSubset<T, EscalationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends EscalationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, EscalationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EscalationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends EscalationUpsertArgs>(args: Prisma.SelectSubset<T, EscalationUpsertArgs<ExtArgs>>): Prisma.Prisma__EscalationClient<runtime.Types.Result.GetResult<Prisma.$EscalationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends EscalationCountArgs>(args?: Prisma.Subset<T, EscalationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], EscalationCountAggregateOutputType> : number>;
    aggregate<T extends EscalationAggregateArgs>(args: Prisma.Subset<T, EscalationAggregateArgs>): Prisma.PrismaPromise<GetEscalationAggregateType<T>>;
    groupBy<T extends EscalationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: EscalationGroupByArgs['orderBy'];
    } : {
        orderBy?: EscalationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, EscalationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEscalationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: EscalationFieldRefs;
}
export interface Prisma__EscalationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    customer<T extends Prisma.CustomerDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CustomerDefaultArgs<ExtArgs>>): Prisma.Prisma__CustomerClient<runtime.Types.Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    extinguisher<T extends Prisma.FireExtinguisherDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FireExtinguisherDefaultArgs<ExtArgs>>): Prisma.Prisma__FireExtinguisherClient<runtime.Types.Result.GetResult<Prisma.$FireExtinguisherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface EscalationFieldRefs {
    readonly id: Prisma.FieldRef<"Escalation", 'String'>;
    readonly reason: Prisma.FieldRef<"Escalation", 'String'>;
    readonly status: Prisma.FieldRef<"Escalation", 'EscalationStatus'>;
    readonly reportedAt: Prisma.FieldRef<"Escalation", 'DateTime'>;
    readonly resolvedAt: Prisma.FieldRef<"Escalation", 'DateTime'>;
    readonly notes: Prisma.FieldRef<"Escalation", 'String'>;
    readonly customerId: Prisma.FieldRef<"Escalation", 'String'>;
    readonly extinguisherId: Prisma.FieldRef<"Escalation", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Escalation", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Escalation", 'DateTime'>;
}
export type EscalationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EscalationSelect<ExtArgs> | null;
    omit?: Prisma.EscalationOmit<ExtArgs> | null;
    include?: Prisma.EscalationInclude<ExtArgs> | null;
    where: Prisma.EscalationWhereUniqueInput;
};
export type EscalationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EscalationSelect<ExtArgs> | null;
    omit?: Prisma.EscalationOmit<ExtArgs> | null;
    include?: Prisma.EscalationInclude<ExtArgs> | null;
    where: Prisma.EscalationWhereUniqueInput;
};
export type EscalationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type EscalationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type EscalationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type EscalationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EscalationSelect<ExtArgs> | null;
    omit?: Prisma.EscalationOmit<ExtArgs> | null;
    include?: Prisma.EscalationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EscalationCreateInput, Prisma.EscalationUncheckedCreateInput>;
};
export type EscalationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.EscalationCreateManyInput | Prisma.EscalationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type EscalationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EscalationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.EscalationOmit<ExtArgs> | null;
    data: Prisma.EscalationCreateManyInput | Prisma.EscalationCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.EscalationIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type EscalationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EscalationSelect<ExtArgs> | null;
    omit?: Prisma.EscalationOmit<ExtArgs> | null;
    include?: Prisma.EscalationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EscalationUpdateInput, Prisma.EscalationUncheckedUpdateInput>;
    where: Prisma.EscalationWhereUniqueInput;
};
export type EscalationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.EscalationUpdateManyMutationInput, Prisma.EscalationUncheckedUpdateManyInput>;
    where?: Prisma.EscalationWhereInput;
    limit?: number;
};
export type EscalationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EscalationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.EscalationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EscalationUpdateManyMutationInput, Prisma.EscalationUncheckedUpdateManyInput>;
    where?: Prisma.EscalationWhereInput;
    limit?: number;
    include?: Prisma.EscalationIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type EscalationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EscalationSelect<ExtArgs> | null;
    omit?: Prisma.EscalationOmit<ExtArgs> | null;
    include?: Prisma.EscalationInclude<ExtArgs> | null;
    where: Prisma.EscalationWhereUniqueInput;
    create: Prisma.XOR<Prisma.EscalationCreateInput, Prisma.EscalationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.EscalationUpdateInput, Prisma.EscalationUncheckedUpdateInput>;
};
export type EscalationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EscalationSelect<ExtArgs> | null;
    omit?: Prisma.EscalationOmit<ExtArgs> | null;
    include?: Prisma.EscalationInclude<ExtArgs> | null;
    where: Prisma.EscalationWhereUniqueInput;
};
export type EscalationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EscalationWhereInput;
    limit?: number;
};
export type EscalationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EscalationSelect<ExtArgs> | null;
    omit?: Prisma.EscalationOmit<ExtArgs> | null;
    include?: Prisma.EscalationInclude<ExtArgs> | null;
};
