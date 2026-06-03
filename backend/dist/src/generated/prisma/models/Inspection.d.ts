import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type InspectionModel = runtime.Types.Result.DefaultSelection<Prisma.$InspectionPayload>;
export type AggregateInspection = {
    _count: InspectionCountAggregateOutputType | null;
    _min: InspectionMinAggregateOutputType | null;
    _max: InspectionMaxAggregateOutputType | null;
};
export type InspectionMinAggregateOutputType = {
    id: string | null;
    extinguisherId: string | null;
    scheduledById: string | null;
    inspectorId: string | null;
    scheduledAt: Date | null;
    status: $Enums.InspectionStatus | null;
    result: string | null;
    notes: string | null;
    completedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type InspectionMaxAggregateOutputType = {
    id: string | null;
    extinguisherId: string | null;
    scheduledById: string | null;
    inspectorId: string | null;
    scheduledAt: Date | null;
    status: $Enums.InspectionStatus | null;
    result: string | null;
    notes: string | null;
    completedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type InspectionCountAggregateOutputType = {
    id: number;
    extinguisherId: number;
    scheduledById: number;
    inspectorId: number;
    scheduledAt: number;
    status: number;
    result: number;
    notes: number;
    completedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type InspectionMinAggregateInputType = {
    id?: true;
    extinguisherId?: true;
    scheduledById?: true;
    inspectorId?: true;
    scheduledAt?: true;
    status?: true;
    result?: true;
    notes?: true;
    completedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type InspectionMaxAggregateInputType = {
    id?: true;
    extinguisherId?: true;
    scheduledById?: true;
    inspectorId?: true;
    scheduledAt?: true;
    status?: true;
    result?: true;
    notes?: true;
    completedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type InspectionCountAggregateInputType = {
    id?: true;
    extinguisherId?: true;
    scheduledById?: true;
    inspectorId?: true;
    scheduledAt?: true;
    status?: true;
    result?: true;
    notes?: true;
    completedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type InspectionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InspectionWhereInput;
    orderBy?: Prisma.InspectionOrderByWithRelationInput | Prisma.InspectionOrderByWithRelationInput[];
    cursor?: Prisma.InspectionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | InspectionCountAggregateInputType;
    _min?: InspectionMinAggregateInputType;
    _max?: InspectionMaxAggregateInputType;
};
export type GetInspectionAggregateType<T extends InspectionAggregateArgs> = {
    [P in keyof T & keyof AggregateInspection]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateInspection[P]> : Prisma.GetScalarType<T[P], AggregateInspection[P]>;
};
export type InspectionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InspectionWhereInput;
    orderBy?: Prisma.InspectionOrderByWithAggregationInput | Prisma.InspectionOrderByWithAggregationInput[];
    by: Prisma.InspectionScalarFieldEnum[] | Prisma.InspectionScalarFieldEnum;
    having?: Prisma.InspectionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: InspectionCountAggregateInputType | true;
    _min?: InspectionMinAggregateInputType;
    _max?: InspectionMaxAggregateInputType;
};
export type InspectionGroupByOutputType = {
    id: string;
    extinguisherId: string;
    scheduledById: string;
    inspectorId: string | null;
    scheduledAt: Date;
    status: $Enums.InspectionStatus;
    result: string | null;
    notes: string | null;
    completedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: InspectionCountAggregateOutputType | null;
    _min: InspectionMinAggregateOutputType | null;
    _max: InspectionMaxAggregateOutputType | null;
};
export type GetInspectionGroupByPayload<T extends InspectionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<InspectionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof InspectionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], InspectionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], InspectionGroupByOutputType[P]>;
}>>;
export type InspectionWhereInput = {
    AND?: Prisma.InspectionWhereInput | Prisma.InspectionWhereInput[];
    OR?: Prisma.InspectionWhereInput[];
    NOT?: Prisma.InspectionWhereInput | Prisma.InspectionWhereInput[];
    id?: Prisma.StringFilter<"Inspection"> | string;
    extinguisherId?: Prisma.StringFilter<"Inspection"> | string;
    scheduledById?: Prisma.StringFilter<"Inspection"> | string;
    inspectorId?: Prisma.StringNullableFilter<"Inspection"> | string | null;
    scheduledAt?: Prisma.DateTimeFilter<"Inspection"> | Date | string;
    status?: Prisma.EnumInspectionStatusFilter<"Inspection"> | $Enums.InspectionStatus;
    result?: Prisma.StringNullableFilter<"Inspection"> | string | null;
    notes?: Prisma.StringNullableFilter<"Inspection"> | string | null;
    completedAt?: Prisma.DateTimeNullableFilter<"Inspection"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Inspection"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Inspection"> | Date | string;
    extinguisher?: Prisma.XOR<Prisma.FireExtinguisherScalarRelationFilter, Prisma.FireExtinguisherWhereInput>;
    scheduledBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    inspector?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    maintenanceLogs?: Prisma.MaintenanceLogListRelationFilter;
};
export type InspectionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    extinguisherId?: Prisma.SortOrder;
    scheduledById?: Prisma.SortOrder;
    inspectorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    scheduledAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    result?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    extinguisher?: Prisma.FireExtinguisherOrderByWithRelationInput;
    scheduledBy?: Prisma.UserOrderByWithRelationInput;
    inspector?: Prisma.UserOrderByWithRelationInput;
    maintenanceLogs?: Prisma.MaintenanceLogOrderByRelationAggregateInput;
};
export type InspectionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.InspectionWhereInput | Prisma.InspectionWhereInput[];
    OR?: Prisma.InspectionWhereInput[];
    NOT?: Prisma.InspectionWhereInput | Prisma.InspectionWhereInput[];
    extinguisherId?: Prisma.StringFilter<"Inspection"> | string;
    scheduledById?: Prisma.StringFilter<"Inspection"> | string;
    inspectorId?: Prisma.StringNullableFilter<"Inspection"> | string | null;
    scheduledAt?: Prisma.DateTimeFilter<"Inspection"> | Date | string;
    status?: Prisma.EnumInspectionStatusFilter<"Inspection"> | $Enums.InspectionStatus;
    result?: Prisma.StringNullableFilter<"Inspection"> | string | null;
    notes?: Prisma.StringNullableFilter<"Inspection"> | string | null;
    completedAt?: Prisma.DateTimeNullableFilter<"Inspection"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Inspection"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Inspection"> | Date | string;
    extinguisher?: Prisma.XOR<Prisma.FireExtinguisherScalarRelationFilter, Prisma.FireExtinguisherWhereInput>;
    scheduledBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    inspector?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    maintenanceLogs?: Prisma.MaintenanceLogListRelationFilter;
}, "id">;
export type InspectionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    extinguisherId?: Prisma.SortOrder;
    scheduledById?: Prisma.SortOrder;
    inspectorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    scheduledAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    result?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.InspectionCountOrderByAggregateInput;
    _max?: Prisma.InspectionMaxOrderByAggregateInput;
    _min?: Prisma.InspectionMinOrderByAggregateInput;
};
export type InspectionScalarWhereWithAggregatesInput = {
    AND?: Prisma.InspectionScalarWhereWithAggregatesInput | Prisma.InspectionScalarWhereWithAggregatesInput[];
    OR?: Prisma.InspectionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.InspectionScalarWhereWithAggregatesInput | Prisma.InspectionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Inspection"> | string;
    extinguisherId?: Prisma.StringWithAggregatesFilter<"Inspection"> | string;
    scheduledById?: Prisma.StringWithAggregatesFilter<"Inspection"> | string;
    inspectorId?: Prisma.StringNullableWithAggregatesFilter<"Inspection"> | string | null;
    scheduledAt?: Prisma.DateTimeWithAggregatesFilter<"Inspection"> | Date | string;
    status?: Prisma.EnumInspectionStatusWithAggregatesFilter<"Inspection"> | $Enums.InspectionStatus;
    result?: Prisma.StringNullableWithAggregatesFilter<"Inspection"> | string | null;
    notes?: Prisma.StringNullableWithAggregatesFilter<"Inspection"> | string | null;
    completedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Inspection"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Inspection"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Inspection"> | Date | string;
};
export type InspectionCreateInput = {
    id?: string;
    scheduledAt: Date | string;
    status?: $Enums.InspectionStatus;
    result?: string | null;
    notes?: string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    extinguisher: Prisma.FireExtinguisherCreateNestedOneWithoutInspectionsInput;
    scheduledBy: Prisma.UserCreateNestedOneWithoutScheduledInspectionsInput;
    inspector?: Prisma.UserCreateNestedOneWithoutAssignedInspectionsInput;
    maintenanceLogs?: Prisma.MaintenanceLogCreateNestedManyWithoutInspectionInput;
};
export type InspectionUncheckedCreateInput = {
    id?: string;
    extinguisherId: string;
    scheduledById: string;
    inspectorId?: string | null;
    scheduledAt: Date | string;
    status?: $Enums.InspectionStatus;
    result?: string | null;
    notes?: string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceLogs?: Prisma.MaintenanceLogUncheckedCreateNestedManyWithoutInspectionInput;
};
export type InspectionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    scheduledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInspectionStatusFieldUpdateOperationsInput | $Enums.InspectionStatus;
    result?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    extinguisher?: Prisma.FireExtinguisherUpdateOneRequiredWithoutInspectionsNestedInput;
    scheduledBy?: Prisma.UserUpdateOneRequiredWithoutScheduledInspectionsNestedInput;
    inspector?: Prisma.UserUpdateOneWithoutAssignedInspectionsNestedInput;
    maintenanceLogs?: Prisma.MaintenanceLogUpdateManyWithoutInspectionNestedInput;
};
export type InspectionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    extinguisherId?: Prisma.StringFieldUpdateOperationsInput | string;
    scheduledById?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scheduledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInspectionStatusFieldUpdateOperationsInput | $Enums.InspectionStatus;
    result?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceLogs?: Prisma.MaintenanceLogUncheckedUpdateManyWithoutInspectionNestedInput;
};
export type InspectionCreateManyInput = {
    id?: string;
    extinguisherId: string;
    scheduledById: string;
    inspectorId?: string | null;
    scheduledAt: Date | string;
    status?: $Enums.InspectionStatus;
    result?: string | null;
    notes?: string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type InspectionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    scheduledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInspectionStatusFieldUpdateOperationsInput | $Enums.InspectionStatus;
    result?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InspectionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    extinguisherId?: Prisma.StringFieldUpdateOperationsInput | string;
    scheduledById?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scheduledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInspectionStatusFieldUpdateOperationsInput | $Enums.InspectionStatus;
    result?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InspectionListRelationFilter = {
    every?: Prisma.InspectionWhereInput;
    some?: Prisma.InspectionWhereInput;
    none?: Prisma.InspectionWhereInput;
};
export type InspectionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type InspectionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    extinguisherId?: Prisma.SortOrder;
    scheduledById?: Prisma.SortOrder;
    inspectorId?: Prisma.SortOrder;
    scheduledAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    result?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type InspectionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    extinguisherId?: Prisma.SortOrder;
    scheduledById?: Prisma.SortOrder;
    inspectorId?: Prisma.SortOrder;
    scheduledAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    result?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type InspectionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    extinguisherId?: Prisma.SortOrder;
    scheduledById?: Prisma.SortOrder;
    inspectorId?: Prisma.SortOrder;
    scheduledAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    result?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type InspectionNullableScalarRelationFilter = {
    is?: Prisma.InspectionWhereInput | null;
    isNot?: Prisma.InspectionWhereInput | null;
};
export type InspectionCreateNestedManyWithoutScheduledByInput = {
    create?: Prisma.XOR<Prisma.InspectionCreateWithoutScheduledByInput, Prisma.InspectionUncheckedCreateWithoutScheduledByInput> | Prisma.InspectionCreateWithoutScheduledByInput[] | Prisma.InspectionUncheckedCreateWithoutScheduledByInput[];
    connectOrCreate?: Prisma.InspectionCreateOrConnectWithoutScheduledByInput | Prisma.InspectionCreateOrConnectWithoutScheduledByInput[];
    createMany?: Prisma.InspectionCreateManyScheduledByInputEnvelope;
    connect?: Prisma.InspectionWhereUniqueInput | Prisma.InspectionWhereUniqueInput[];
};
export type InspectionCreateNestedManyWithoutInspectorInput = {
    create?: Prisma.XOR<Prisma.InspectionCreateWithoutInspectorInput, Prisma.InspectionUncheckedCreateWithoutInspectorInput> | Prisma.InspectionCreateWithoutInspectorInput[] | Prisma.InspectionUncheckedCreateWithoutInspectorInput[];
    connectOrCreate?: Prisma.InspectionCreateOrConnectWithoutInspectorInput | Prisma.InspectionCreateOrConnectWithoutInspectorInput[];
    createMany?: Prisma.InspectionCreateManyInspectorInputEnvelope;
    connect?: Prisma.InspectionWhereUniqueInput | Prisma.InspectionWhereUniqueInput[];
};
export type InspectionUncheckedCreateNestedManyWithoutScheduledByInput = {
    create?: Prisma.XOR<Prisma.InspectionCreateWithoutScheduledByInput, Prisma.InspectionUncheckedCreateWithoutScheduledByInput> | Prisma.InspectionCreateWithoutScheduledByInput[] | Prisma.InspectionUncheckedCreateWithoutScheduledByInput[];
    connectOrCreate?: Prisma.InspectionCreateOrConnectWithoutScheduledByInput | Prisma.InspectionCreateOrConnectWithoutScheduledByInput[];
    createMany?: Prisma.InspectionCreateManyScheduledByInputEnvelope;
    connect?: Prisma.InspectionWhereUniqueInput | Prisma.InspectionWhereUniqueInput[];
};
export type InspectionUncheckedCreateNestedManyWithoutInspectorInput = {
    create?: Prisma.XOR<Prisma.InspectionCreateWithoutInspectorInput, Prisma.InspectionUncheckedCreateWithoutInspectorInput> | Prisma.InspectionCreateWithoutInspectorInput[] | Prisma.InspectionUncheckedCreateWithoutInspectorInput[];
    connectOrCreate?: Prisma.InspectionCreateOrConnectWithoutInspectorInput | Prisma.InspectionCreateOrConnectWithoutInspectorInput[];
    createMany?: Prisma.InspectionCreateManyInspectorInputEnvelope;
    connect?: Prisma.InspectionWhereUniqueInput | Prisma.InspectionWhereUniqueInput[];
};
export type InspectionUpdateManyWithoutScheduledByNestedInput = {
    create?: Prisma.XOR<Prisma.InspectionCreateWithoutScheduledByInput, Prisma.InspectionUncheckedCreateWithoutScheduledByInput> | Prisma.InspectionCreateWithoutScheduledByInput[] | Prisma.InspectionUncheckedCreateWithoutScheduledByInput[];
    connectOrCreate?: Prisma.InspectionCreateOrConnectWithoutScheduledByInput | Prisma.InspectionCreateOrConnectWithoutScheduledByInput[];
    upsert?: Prisma.InspectionUpsertWithWhereUniqueWithoutScheduledByInput | Prisma.InspectionUpsertWithWhereUniqueWithoutScheduledByInput[];
    createMany?: Prisma.InspectionCreateManyScheduledByInputEnvelope;
    set?: Prisma.InspectionWhereUniqueInput | Prisma.InspectionWhereUniqueInput[];
    disconnect?: Prisma.InspectionWhereUniqueInput | Prisma.InspectionWhereUniqueInput[];
    delete?: Prisma.InspectionWhereUniqueInput | Prisma.InspectionWhereUniqueInput[];
    connect?: Prisma.InspectionWhereUniqueInput | Prisma.InspectionWhereUniqueInput[];
    update?: Prisma.InspectionUpdateWithWhereUniqueWithoutScheduledByInput | Prisma.InspectionUpdateWithWhereUniqueWithoutScheduledByInput[];
    updateMany?: Prisma.InspectionUpdateManyWithWhereWithoutScheduledByInput | Prisma.InspectionUpdateManyWithWhereWithoutScheduledByInput[];
    deleteMany?: Prisma.InspectionScalarWhereInput | Prisma.InspectionScalarWhereInput[];
};
export type InspectionUpdateManyWithoutInspectorNestedInput = {
    create?: Prisma.XOR<Prisma.InspectionCreateWithoutInspectorInput, Prisma.InspectionUncheckedCreateWithoutInspectorInput> | Prisma.InspectionCreateWithoutInspectorInput[] | Prisma.InspectionUncheckedCreateWithoutInspectorInput[];
    connectOrCreate?: Prisma.InspectionCreateOrConnectWithoutInspectorInput | Prisma.InspectionCreateOrConnectWithoutInspectorInput[];
    upsert?: Prisma.InspectionUpsertWithWhereUniqueWithoutInspectorInput | Prisma.InspectionUpsertWithWhereUniqueWithoutInspectorInput[];
    createMany?: Prisma.InspectionCreateManyInspectorInputEnvelope;
    set?: Prisma.InspectionWhereUniqueInput | Prisma.InspectionWhereUniqueInput[];
    disconnect?: Prisma.InspectionWhereUniqueInput | Prisma.InspectionWhereUniqueInput[];
    delete?: Prisma.InspectionWhereUniqueInput | Prisma.InspectionWhereUniqueInput[];
    connect?: Prisma.InspectionWhereUniqueInput | Prisma.InspectionWhereUniqueInput[];
    update?: Prisma.InspectionUpdateWithWhereUniqueWithoutInspectorInput | Prisma.InspectionUpdateWithWhereUniqueWithoutInspectorInput[];
    updateMany?: Prisma.InspectionUpdateManyWithWhereWithoutInspectorInput | Prisma.InspectionUpdateManyWithWhereWithoutInspectorInput[];
    deleteMany?: Prisma.InspectionScalarWhereInput | Prisma.InspectionScalarWhereInput[];
};
export type InspectionUncheckedUpdateManyWithoutScheduledByNestedInput = {
    create?: Prisma.XOR<Prisma.InspectionCreateWithoutScheduledByInput, Prisma.InspectionUncheckedCreateWithoutScheduledByInput> | Prisma.InspectionCreateWithoutScheduledByInput[] | Prisma.InspectionUncheckedCreateWithoutScheduledByInput[];
    connectOrCreate?: Prisma.InspectionCreateOrConnectWithoutScheduledByInput | Prisma.InspectionCreateOrConnectWithoutScheduledByInput[];
    upsert?: Prisma.InspectionUpsertWithWhereUniqueWithoutScheduledByInput | Prisma.InspectionUpsertWithWhereUniqueWithoutScheduledByInput[];
    createMany?: Prisma.InspectionCreateManyScheduledByInputEnvelope;
    set?: Prisma.InspectionWhereUniqueInput | Prisma.InspectionWhereUniqueInput[];
    disconnect?: Prisma.InspectionWhereUniqueInput | Prisma.InspectionWhereUniqueInput[];
    delete?: Prisma.InspectionWhereUniqueInput | Prisma.InspectionWhereUniqueInput[];
    connect?: Prisma.InspectionWhereUniqueInput | Prisma.InspectionWhereUniqueInput[];
    update?: Prisma.InspectionUpdateWithWhereUniqueWithoutScheduledByInput | Prisma.InspectionUpdateWithWhereUniqueWithoutScheduledByInput[];
    updateMany?: Prisma.InspectionUpdateManyWithWhereWithoutScheduledByInput | Prisma.InspectionUpdateManyWithWhereWithoutScheduledByInput[];
    deleteMany?: Prisma.InspectionScalarWhereInput | Prisma.InspectionScalarWhereInput[];
};
export type InspectionUncheckedUpdateManyWithoutInspectorNestedInput = {
    create?: Prisma.XOR<Prisma.InspectionCreateWithoutInspectorInput, Prisma.InspectionUncheckedCreateWithoutInspectorInput> | Prisma.InspectionCreateWithoutInspectorInput[] | Prisma.InspectionUncheckedCreateWithoutInspectorInput[];
    connectOrCreate?: Prisma.InspectionCreateOrConnectWithoutInspectorInput | Prisma.InspectionCreateOrConnectWithoutInspectorInput[];
    upsert?: Prisma.InspectionUpsertWithWhereUniqueWithoutInspectorInput | Prisma.InspectionUpsertWithWhereUniqueWithoutInspectorInput[];
    createMany?: Prisma.InspectionCreateManyInspectorInputEnvelope;
    set?: Prisma.InspectionWhereUniqueInput | Prisma.InspectionWhereUniqueInput[];
    disconnect?: Prisma.InspectionWhereUniqueInput | Prisma.InspectionWhereUniqueInput[];
    delete?: Prisma.InspectionWhereUniqueInput | Prisma.InspectionWhereUniqueInput[];
    connect?: Prisma.InspectionWhereUniqueInput | Prisma.InspectionWhereUniqueInput[];
    update?: Prisma.InspectionUpdateWithWhereUniqueWithoutInspectorInput | Prisma.InspectionUpdateWithWhereUniqueWithoutInspectorInput[];
    updateMany?: Prisma.InspectionUpdateManyWithWhereWithoutInspectorInput | Prisma.InspectionUpdateManyWithWhereWithoutInspectorInput[];
    deleteMany?: Prisma.InspectionScalarWhereInput | Prisma.InspectionScalarWhereInput[];
};
export type InspectionCreateNestedManyWithoutExtinguisherInput = {
    create?: Prisma.XOR<Prisma.InspectionCreateWithoutExtinguisherInput, Prisma.InspectionUncheckedCreateWithoutExtinguisherInput> | Prisma.InspectionCreateWithoutExtinguisherInput[] | Prisma.InspectionUncheckedCreateWithoutExtinguisherInput[];
    connectOrCreate?: Prisma.InspectionCreateOrConnectWithoutExtinguisherInput | Prisma.InspectionCreateOrConnectWithoutExtinguisherInput[];
    createMany?: Prisma.InspectionCreateManyExtinguisherInputEnvelope;
    connect?: Prisma.InspectionWhereUniqueInput | Prisma.InspectionWhereUniqueInput[];
};
export type InspectionUncheckedCreateNestedManyWithoutExtinguisherInput = {
    create?: Prisma.XOR<Prisma.InspectionCreateWithoutExtinguisherInput, Prisma.InspectionUncheckedCreateWithoutExtinguisherInput> | Prisma.InspectionCreateWithoutExtinguisherInput[] | Prisma.InspectionUncheckedCreateWithoutExtinguisherInput[];
    connectOrCreate?: Prisma.InspectionCreateOrConnectWithoutExtinguisherInput | Prisma.InspectionCreateOrConnectWithoutExtinguisherInput[];
    createMany?: Prisma.InspectionCreateManyExtinguisherInputEnvelope;
    connect?: Prisma.InspectionWhereUniqueInput | Prisma.InspectionWhereUniqueInput[];
};
export type InspectionUpdateManyWithoutExtinguisherNestedInput = {
    create?: Prisma.XOR<Prisma.InspectionCreateWithoutExtinguisherInput, Prisma.InspectionUncheckedCreateWithoutExtinguisherInput> | Prisma.InspectionCreateWithoutExtinguisherInput[] | Prisma.InspectionUncheckedCreateWithoutExtinguisherInput[];
    connectOrCreate?: Prisma.InspectionCreateOrConnectWithoutExtinguisherInput | Prisma.InspectionCreateOrConnectWithoutExtinguisherInput[];
    upsert?: Prisma.InspectionUpsertWithWhereUniqueWithoutExtinguisherInput | Prisma.InspectionUpsertWithWhereUniqueWithoutExtinguisherInput[];
    createMany?: Prisma.InspectionCreateManyExtinguisherInputEnvelope;
    set?: Prisma.InspectionWhereUniqueInput | Prisma.InspectionWhereUniqueInput[];
    disconnect?: Prisma.InspectionWhereUniqueInput | Prisma.InspectionWhereUniqueInput[];
    delete?: Prisma.InspectionWhereUniqueInput | Prisma.InspectionWhereUniqueInput[];
    connect?: Prisma.InspectionWhereUniqueInput | Prisma.InspectionWhereUniqueInput[];
    update?: Prisma.InspectionUpdateWithWhereUniqueWithoutExtinguisherInput | Prisma.InspectionUpdateWithWhereUniqueWithoutExtinguisherInput[];
    updateMany?: Prisma.InspectionUpdateManyWithWhereWithoutExtinguisherInput | Prisma.InspectionUpdateManyWithWhereWithoutExtinguisherInput[];
    deleteMany?: Prisma.InspectionScalarWhereInput | Prisma.InspectionScalarWhereInput[];
};
export type InspectionUncheckedUpdateManyWithoutExtinguisherNestedInput = {
    create?: Prisma.XOR<Prisma.InspectionCreateWithoutExtinguisherInput, Prisma.InspectionUncheckedCreateWithoutExtinguisherInput> | Prisma.InspectionCreateWithoutExtinguisherInput[] | Prisma.InspectionUncheckedCreateWithoutExtinguisherInput[];
    connectOrCreate?: Prisma.InspectionCreateOrConnectWithoutExtinguisherInput | Prisma.InspectionCreateOrConnectWithoutExtinguisherInput[];
    upsert?: Prisma.InspectionUpsertWithWhereUniqueWithoutExtinguisherInput | Prisma.InspectionUpsertWithWhereUniqueWithoutExtinguisherInput[];
    createMany?: Prisma.InspectionCreateManyExtinguisherInputEnvelope;
    set?: Prisma.InspectionWhereUniqueInput | Prisma.InspectionWhereUniqueInput[];
    disconnect?: Prisma.InspectionWhereUniqueInput | Prisma.InspectionWhereUniqueInput[];
    delete?: Prisma.InspectionWhereUniqueInput | Prisma.InspectionWhereUniqueInput[];
    connect?: Prisma.InspectionWhereUniqueInput | Prisma.InspectionWhereUniqueInput[];
    update?: Prisma.InspectionUpdateWithWhereUniqueWithoutExtinguisherInput | Prisma.InspectionUpdateWithWhereUniqueWithoutExtinguisherInput[];
    updateMany?: Prisma.InspectionUpdateManyWithWhereWithoutExtinguisherInput | Prisma.InspectionUpdateManyWithWhereWithoutExtinguisherInput[];
    deleteMany?: Prisma.InspectionScalarWhereInput | Prisma.InspectionScalarWhereInput[];
};
export type EnumInspectionStatusFieldUpdateOperationsInput = {
    set?: $Enums.InspectionStatus;
};
export type InspectionCreateNestedOneWithoutMaintenanceLogsInput = {
    create?: Prisma.XOR<Prisma.InspectionCreateWithoutMaintenanceLogsInput, Prisma.InspectionUncheckedCreateWithoutMaintenanceLogsInput>;
    connectOrCreate?: Prisma.InspectionCreateOrConnectWithoutMaintenanceLogsInput;
    connect?: Prisma.InspectionWhereUniqueInput;
};
export type InspectionUpdateOneWithoutMaintenanceLogsNestedInput = {
    create?: Prisma.XOR<Prisma.InspectionCreateWithoutMaintenanceLogsInput, Prisma.InspectionUncheckedCreateWithoutMaintenanceLogsInput>;
    connectOrCreate?: Prisma.InspectionCreateOrConnectWithoutMaintenanceLogsInput;
    upsert?: Prisma.InspectionUpsertWithoutMaintenanceLogsInput;
    disconnect?: Prisma.InspectionWhereInput | boolean;
    delete?: Prisma.InspectionWhereInput | boolean;
    connect?: Prisma.InspectionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.InspectionUpdateToOneWithWhereWithoutMaintenanceLogsInput, Prisma.InspectionUpdateWithoutMaintenanceLogsInput>, Prisma.InspectionUncheckedUpdateWithoutMaintenanceLogsInput>;
};
export type InspectionCreateWithoutScheduledByInput = {
    id?: string;
    scheduledAt: Date | string;
    status?: $Enums.InspectionStatus;
    result?: string | null;
    notes?: string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    extinguisher: Prisma.FireExtinguisherCreateNestedOneWithoutInspectionsInput;
    inspector?: Prisma.UserCreateNestedOneWithoutAssignedInspectionsInput;
    maintenanceLogs?: Prisma.MaintenanceLogCreateNestedManyWithoutInspectionInput;
};
export type InspectionUncheckedCreateWithoutScheduledByInput = {
    id?: string;
    extinguisherId: string;
    inspectorId?: string | null;
    scheduledAt: Date | string;
    status?: $Enums.InspectionStatus;
    result?: string | null;
    notes?: string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceLogs?: Prisma.MaintenanceLogUncheckedCreateNestedManyWithoutInspectionInput;
};
export type InspectionCreateOrConnectWithoutScheduledByInput = {
    where: Prisma.InspectionWhereUniqueInput;
    create: Prisma.XOR<Prisma.InspectionCreateWithoutScheduledByInput, Prisma.InspectionUncheckedCreateWithoutScheduledByInput>;
};
export type InspectionCreateManyScheduledByInputEnvelope = {
    data: Prisma.InspectionCreateManyScheduledByInput | Prisma.InspectionCreateManyScheduledByInput[];
    skipDuplicates?: boolean;
};
export type InspectionCreateWithoutInspectorInput = {
    id?: string;
    scheduledAt: Date | string;
    status?: $Enums.InspectionStatus;
    result?: string | null;
    notes?: string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    extinguisher: Prisma.FireExtinguisherCreateNestedOneWithoutInspectionsInput;
    scheduledBy: Prisma.UserCreateNestedOneWithoutScheduledInspectionsInput;
    maintenanceLogs?: Prisma.MaintenanceLogCreateNestedManyWithoutInspectionInput;
};
export type InspectionUncheckedCreateWithoutInspectorInput = {
    id?: string;
    extinguisherId: string;
    scheduledById: string;
    scheduledAt: Date | string;
    status?: $Enums.InspectionStatus;
    result?: string | null;
    notes?: string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceLogs?: Prisma.MaintenanceLogUncheckedCreateNestedManyWithoutInspectionInput;
};
export type InspectionCreateOrConnectWithoutInspectorInput = {
    where: Prisma.InspectionWhereUniqueInput;
    create: Prisma.XOR<Prisma.InspectionCreateWithoutInspectorInput, Prisma.InspectionUncheckedCreateWithoutInspectorInput>;
};
export type InspectionCreateManyInspectorInputEnvelope = {
    data: Prisma.InspectionCreateManyInspectorInput | Prisma.InspectionCreateManyInspectorInput[];
    skipDuplicates?: boolean;
};
export type InspectionUpsertWithWhereUniqueWithoutScheduledByInput = {
    where: Prisma.InspectionWhereUniqueInput;
    update: Prisma.XOR<Prisma.InspectionUpdateWithoutScheduledByInput, Prisma.InspectionUncheckedUpdateWithoutScheduledByInput>;
    create: Prisma.XOR<Prisma.InspectionCreateWithoutScheduledByInput, Prisma.InspectionUncheckedCreateWithoutScheduledByInput>;
};
export type InspectionUpdateWithWhereUniqueWithoutScheduledByInput = {
    where: Prisma.InspectionWhereUniqueInput;
    data: Prisma.XOR<Prisma.InspectionUpdateWithoutScheduledByInput, Prisma.InspectionUncheckedUpdateWithoutScheduledByInput>;
};
export type InspectionUpdateManyWithWhereWithoutScheduledByInput = {
    where: Prisma.InspectionScalarWhereInput;
    data: Prisma.XOR<Prisma.InspectionUpdateManyMutationInput, Prisma.InspectionUncheckedUpdateManyWithoutScheduledByInput>;
};
export type InspectionScalarWhereInput = {
    AND?: Prisma.InspectionScalarWhereInput | Prisma.InspectionScalarWhereInput[];
    OR?: Prisma.InspectionScalarWhereInput[];
    NOT?: Prisma.InspectionScalarWhereInput | Prisma.InspectionScalarWhereInput[];
    id?: Prisma.StringFilter<"Inspection"> | string;
    extinguisherId?: Prisma.StringFilter<"Inspection"> | string;
    scheduledById?: Prisma.StringFilter<"Inspection"> | string;
    inspectorId?: Prisma.StringNullableFilter<"Inspection"> | string | null;
    scheduledAt?: Prisma.DateTimeFilter<"Inspection"> | Date | string;
    status?: Prisma.EnumInspectionStatusFilter<"Inspection"> | $Enums.InspectionStatus;
    result?: Prisma.StringNullableFilter<"Inspection"> | string | null;
    notes?: Prisma.StringNullableFilter<"Inspection"> | string | null;
    completedAt?: Prisma.DateTimeNullableFilter<"Inspection"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Inspection"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Inspection"> | Date | string;
};
export type InspectionUpsertWithWhereUniqueWithoutInspectorInput = {
    where: Prisma.InspectionWhereUniqueInput;
    update: Prisma.XOR<Prisma.InspectionUpdateWithoutInspectorInput, Prisma.InspectionUncheckedUpdateWithoutInspectorInput>;
    create: Prisma.XOR<Prisma.InspectionCreateWithoutInspectorInput, Prisma.InspectionUncheckedCreateWithoutInspectorInput>;
};
export type InspectionUpdateWithWhereUniqueWithoutInspectorInput = {
    where: Prisma.InspectionWhereUniqueInput;
    data: Prisma.XOR<Prisma.InspectionUpdateWithoutInspectorInput, Prisma.InspectionUncheckedUpdateWithoutInspectorInput>;
};
export type InspectionUpdateManyWithWhereWithoutInspectorInput = {
    where: Prisma.InspectionScalarWhereInput;
    data: Prisma.XOR<Prisma.InspectionUpdateManyMutationInput, Prisma.InspectionUncheckedUpdateManyWithoutInspectorInput>;
};
export type InspectionCreateWithoutExtinguisherInput = {
    id?: string;
    scheduledAt: Date | string;
    status?: $Enums.InspectionStatus;
    result?: string | null;
    notes?: string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    scheduledBy: Prisma.UserCreateNestedOneWithoutScheduledInspectionsInput;
    inspector?: Prisma.UserCreateNestedOneWithoutAssignedInspectionsInput;
    maintenanceLogs?: Prisma.MaintenanceLogCreateNestedManyWithoutInspectionInput;
};
export type InspectionUncheckedCreateWithoutExtinguisherInput = {
    id?: string;
    scheduledById: string;
    inspectorId?: string | null;
    scheduledAt: Date | string;
    status?: $Enums.InspectionStatus;
    result?: string | null;
    notes?: string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceLogs?: Prisma.MaintenanceLogUncheckedCreateNestedManyWithoutInspectionInput;
};
export type InspectionCreateOrConnectWithoutExtinguisherInput = {
    where: Prisma.InspectionWhereUniqueInput;
    create: Prisma.XOR<Prisma.InspectionCreateWithoutExtinguisherInput, Prisma.InspectionUncheckedCreateWithoutExtinguisherInput>;
};
export type InspectionCreateManyExtinguisherInputEnvelope = {
    data: Prisma.InspectionCreateManyExtinguisherInput | Prisma.InspectionCreateManyExtinguisherInput[];
    skipDuplicates?: boolean;
};
export type InspectionUpsertWithWhereUniqueWithoutExtinguisherInput = {
    where: Prisma.InspectionWhereUniqueInput;
    update: Prisma.XOR<Prisma.InspectionUpdateWithoutExtinguisherInput, Prisma.InspectionUncheckedUpdateWithoutExtinguisherInput>;
    create: Prisma.XOR<Prisma.InspectionCreateWithoutExtinguisherInput, Prisma.InspectionUncheckedCreateWithoutExtinguisherInput>;
};
export type InspectionUpdateWithWhereUniqueWithoutExtinguisherInput = {
    where: Prisma.InspectionWhereUniqueInput;
    data: Prisma.XOR<Prisma.InspectionUpdateWithoutExtinguisherInput, Prisma.InspectionUncheckedUpdateWithoutExtinguisherInput>;
};
export type InspectionUpdateManyWithWhereWithoutExtinguisherInput = {
    where: Prisma.InspectionScalarWhereInput;
    data: Prisma.XOR<Prisma.InspectionUpdateManyMutationInput, Prisma.InspectionUncheckedUpdateManyWithoutExtinguisherInput>;
};
export type InspectionCreateWithoutMaintenanceLogsInput = {
    id?: string;
    scheduledAt: Date | string;
    status?: $Enums.InspectionStatus;
    result?: string | null;
    notes?: string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    extinguisher: Prisma.FireExtinguisherCreateNestedOneWithoutInspectionsInput;
    scheduledBy: Prisma.UserCreateNestedOneWithoutScheduledInspectionsInput;
    inspector?: Prisma.UserCreateNestedOneWithoutAssignedInspectionsInput;
};
export type InspectionUncheckedCreateWithoutMaintenanceLogsInput = {
    id?: string;
    extinguisherId: string;
    scheduledById: string;
    inspectorId?: string | null;
    scheduledAt: Date | string;
    status?: $Enums.InspectionStatus;
    result?: string | null;
    notes?: string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type InspectionCreateOrConnectWithoutMaintenanceLogsInput = {
    where: Prisma.InspectionWhereUniqueInput;
    create: Prisma.XOR<Prisma.InspectionCreateWithoutMaintenanceLogsInput, Prisma.InspectionUncheckedCreateWithoutMaintenanceLogsInput>;
};
export type InspectionUpsertWithoutMaintenanceLogsInput = {
    update: Prisma.XOR<Prisma.InspectionUpdateWithoutMaintenanceLogsInput, Prisma.InspectionUncheckedUpdateWithoutMaintenanceLogsInput>;
    create: Prisma.XOR<Prisma.InspectionCreateWithoutMaintenanceLogsInput, Prisma.InspectionUncheckedCreateWithoutMaintenanceLogsInput>;
    where?: Prisma.InspectionWhereInput;
};
export type InspectionUpdateToOneWithWhereWithoutMaintenanceLogsInput = {
    where?: Prisma.InspectionWhereInput;
    data: Prisma.XOR<Prisma.InspectionUpdateWithoutMaintenanceLogsInput, Prisma.InspectionUncheckedUpdateWithoutMaintenanceLogsInput>;
};
export type InspectionUpdateWithoutMaintenanceLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    scheduledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInspectionStatusFieldUpdateOperationsInput | $Enums.InspectionStatus;
    result?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    extinguisher?: Prisma.FireExtinguisherUpdateOneRequiredWithoutInspectionsNestedInput;
    scheduledBy?: Prisma.UserUpdateOneRequiredWithoutScheduledInspectionsNestedInput;
    inspector?: Prisma.UserUpdateOneWithoutAssignedInspectionsNestedInput;
};
export type InspectionUncheckedUpdateWithoutMaintenanceLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    extinguisherId?: Prisma.StringFieldUpdateOperationsInput | string;
    scheduledById?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scheduledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInspectionStatusFieldUpdateOperationsInput | $Enums.InspectionStatus;
    result?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InspectionCreateManyScheduledByInput = {
    id?: string;
    extinguisherId: string;
    inspectorId?: string | null;
    scheduledAt: Date | string;
    status?: $Enums.InspectionStatus;
    result?: string | null;
    notes?: string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type InspectionCreateManyInspectorInput = {
    id?: string;
    extinguisherId: string;
    scheduledById: string;
    scheduledAt: Date | string;
    status?: $Enums.InspectionStatus;
    result?: string | null;
    notes?: string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type InspectionUpdateWithoutScheduledByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    scheduledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInspectionStatusFieldUpdateOperationsInput | $Enums.InspectionStatus;
    result?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    extinguisher?: Prisma.FireExtinguisherUpdateOneRequiredWithoutInspectionsNestedInput;
    inspector?: Prisma.UserUpdateOneWithoutAssignedInspectionsNestedInput;
    maintenanceLogs?: Prisma.MaintenanceLogUpdateManyWithoutInspectionNestedInput;
};
export type InspectionUncheckedUpdateWithoutScheduledByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    extinguisherId?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scheduledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInspectionStatusFieldUpdateOperationsInput | $Enums.InspectionStatus;
    result?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceLogs?: Prisma.MaintenanceLogUncheckedUpdateManyWithoutInspectionNestedInput;
};
export type InspectionUncheckedUpdateManyWithoutScheduledByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    extinguisherId?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scheduledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInspectionStatusFieldUpdateOperationsInput | $Enums.InspectionStatus;
    result?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InspectionUpdateWithoutInspectorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    scheduledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInspectionStatusFieldUpdateOperationsInput | $Enums.InspectionStatus;
    result?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    extinguisher?: Prisma.FireExtinguisherUpdateOneRequiredWithoutInspectionsNestedInput;
    scheduledBy?: Prisma.UserUpdateOneRequiredWithoutScheduledInspectionsNestedInput;
    maintenanceLogs?: Prisma.MaintenanceLogUpdateManyWithoutInspectionNestedInput;
};
export type InspectionUncheckedUpdateWithoutInspectorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    extinguisherId?: Prisma.StringFieldUpdateOperationsInput | string;
    scheduledById?: Prisma.StringFieldUpdateOperationsInput | string;
    scheduledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInspectionStatusFieldUpdateOperationsInput | $Enums.InspectionStatus;
    result?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceLogs?: Prisma.MaintenanceLogUncheckedUpdateManyWithoutInspectionNestedInput;
};
export type InspectionUncheckedUpdateManyWithoutInspectorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    extinguisherId?: Prisma.StringFieldUpdateOperationsInput | string;
    scheduledById?: Prisma.StringFieldUpdateOperationsInput | string;
    scheduledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInspectionStatusFieldUpdateOperationsInput | $Enums.InspectionStatus;
    result?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InspectionCreateManyExtinguisherInput = {
    id?: string;
    scheduledById: string;
    inspectorId?: string | null;
    scheduledAt: Date | string;
    status?: $Enums.InspectionStatus;
    result?: string | null;
    notes?: string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type InspectionUpdateWithoutExtinguisherInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    scheduledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInspectionStatusFieldUpdateOperationsInput | $Enums.InspectionStatus;
    result?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    scheduledBy?: Prisma.UserUpdateOneRequiredWithoutScheduledInspectionsNestedInput;
    inspector?: Prisma.UserUpdateOneWithoutAssignedInspectionsNestedInput;
    maintenanceLogs?: Prisma.MaintenanceLogUpdateManyWithoutInspectionNestedInput;
};
export type InspectionUncheckedUpdateWithoutExtinguisherInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    scheduledById?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scheduledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInspectionStatusFieldUpdateOperationsInput | $Enums.InspectionStatus;
    result?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceLogs?: Prisma.MaintenanceLogUncheckedUpdateManyWithoutInspectionNestedInput;
};
export type InspectionUncheckedUpdateManyWithoutExtinguisherInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    scheduledById?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scheduledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInspectionStatusFieldUpdateOperationsInput | $Enums.InspectionStatus;
    result?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InspectionCountOutputType = {
    maintenanceLogs: number;
};
export type InspectionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    maintenanceLogs?: boolean | InspectionCountOutputTypeCountMaintenanceLogsArgs;
};
export type InspectionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectionCountOutputTypeSelect<ExtArgs> | null;
};
export type InspectionCountOutputTypeCountMaintenanceLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaintenanceLogWhereInput;
};
export type InspectionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    extinguisherId?: boolean;
    scheduledById?: boolean;
    inspectorId?: boolean;
    scheduledAt?: boolean;
    status?: boolean;
    result?: boolean;
    notes?: boolean;
    completedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    extinguisher?: boolean | Prisma.FireExtinguisherDefaultArgs<ExtArgs>;
    scheduledBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    inspector?: boolean | Prisma.Inspection$inspectorArgs<ExtArgs>;
    maintenanceLogs?: boolean | Prisma.Inspection$maintenanceLogsArgs<ExtArgs>;
    _count?: boolean | Prisma.InspectionCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["inspection"]>;
export type InspectionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    extinguisherId?: boolean;
    scheduledById?: boolean;
    inspectorId?: boolean;
    scheduledAt?: boolean;
    status?: boolean;
    result?: boolean;
    notes?: boolean;
    completedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    extinguisher?: boolean | Prisma.FireExtinguisherDefaultArgs<ExtArgs>;
    scheduledBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    inspector?: boolean | Prisma.Inspection$inspectorArgs<ExtArgs>;
}, ExtArgs["result"]["inspection"]>;
export type InspectionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    extinguisherId?: boolean;
    scheduledById?: boolean;
    inspectorId?: boolean;
    scheduledAt?: boolean;
    status?: boolean;
    result?: boolean;
    notes?: boolean;
    completedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    extinguisher?: boolean | Prisma.FireExtinguisherDefaultArgs<ExtArgs>;
    scheduledBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    inspector?: boolean | Prisma.Inspection$inspectorArgs<ExtArgs>;
}, ExtArgs["result"]["inspection"]>;
export type InspectionSelectScalar = {
    id?: boolean;
    extinguisherId?: boolean;
    scheduledById?: boolean;
    inspectorId?: boolean;
    scheduledAt?: boolean;
    status?: boolean;
    result?: boolean;
    notes?: boolean;
    completedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type InspectionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "extinguisherId" | "scheduledById" | "inspectorId" | "scheduledAt" | "status" | "result" | "notes" | "completedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["inspection"]>;
export type InspectionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    extinguisher?: boolean | Prisma.FireExtinguisherDefaultArgs<ExtArgs>;
    scheduledBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    inspector?: boolean | Prisma.Inspection$inspectorArgs<ExtArgs>;
    maintenanceLogs?: boolean | Prisma.Inspection$maintenanceLogsArgs<ExtArgs>;
    _count?: boolean | Prisma.InspectionCountOutputTypeDefaultArgs<ExtArgs>;
};
export type InspectionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    extinguisher?: boolean | Prisma.FireExtinguisherDefaultArgs<ExtArgs>;
    scheduledBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    inspector?: boolean | Prisma.Inspection$inspectorArgs<ExtArgs>;
};
export type InspectionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    extinguisher?: boolean | Prisma.FireExtinguisherDefaultArgs<ExtArgs>;
    scheduledBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    inspector?: boolean | Prisma.Inspection$inspectorArgs<ExtArgs>;
};
export type $InspectionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Inspection";
    objects: {
        extinguisher: Prisma.$FireExtinguisherPayload<ExtArgs>;
        scheduledBy: Prisma.$UserPayload<ExtArgs>;
        inspector: Prisma.$UserPayload<ExtArgs> | null;
        maintenanceLogs: Prisma.$MaintenanceLogPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        extinguisherId: string;
        scheduledById: string;
        inspectorId: string | null;
        scheduledAt: Date;
        status: $Enums.InspectionStatus;
        result: string | null;
        notes: string | null;
        completedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["inspection"]>;
    composites: {};
};
export type InspectionGetPayload<S extends boolean | null | undefined | InspectionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$InspectionPayload, S>;
export type InspectionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<InspectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: InspectionCountAggregateInputType | true;
};
export interface InspectionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Inspection'];
        meta: {
            name: 'Inspection';
        };
    };
    findUnique<T extends InspectionFindUniqueArgs>(args: Prisma.SelectSubset<T, InspectionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__InspectionClient<runtime.Types.Result.GetResult<Prisma.$InspectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends InspectionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, InspectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__InspectionClient<runtime.Types.Result.GetResult<Prisma.$InspectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends InspectionFindFirstArgs>(args?: Prisma.SelectSubset<T, InspectionFindFirstArgs<ExtArgs>>): Prisma.Prisma__InspectionClient<runtime.Types.Result.GetResult<Prisma.$InspectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends InspectionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, InspectionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__InspectionClient<runtime.Types.Result.GetResult<Prisma.$InspectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends InspectionFindManyArgs>(args?: Prisma.SelectSubset<T, InspectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InspectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends InspectionCreateArgs>(args: Prisma.SelectSubset<T, InspectionCreateArgs<ExtArgs>>): Prisma.Prisma__InspectionClient<runtime.Types.Result.GetResult<Prisma.$InspectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends InspectionCreateManyArgs>(args?: Prisma.SelectSubset<T, InspectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends InspectionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, InspectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InspectionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends InspectionDeleteArgs>(args: Prisma.SelectSubset<T, InspectionDeleteArgs<ExtArgs>>): Prisma.Prisma__InspectionClient<runtime.Types.Result.GetResult<Prisma.$InspectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends InspectionUpdateArgs>(args: Prisma.SelectSubset<T, InspectionUpdateArgs<ExtArgs>>): Prisma.Prisma__InspectionClient<runtime.Types.Result.GetResult<Prisma.$InspectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends InspectionDeleteManyArgs>(args?: Prisma.SelectSubset<T, InspectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends InspectionUpdateManyArgs>(args: Prisma.SelectSubset<T, InspectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends InspectionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, InspectionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InspectionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends InspectionUpsertArgs>(args: Prisma.SelectSubset<T, InspectionUpsertArgs<ExtArgs>>): Prisma.Prisma__InspectionClient<runtime.Types.Result.GetResult<Prisma.$InspectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends InspectionCountArgs>(args?: Prisma.Subset<T, InspectionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], InspectionCountAggregateOutputType> : number>;
    aggregate<T extends InspectionAggregateArgs>(args: Prisma.Subset<T, InspectionAggregateArgs>): Prisma.PrismaPromise<GetInspectionAggregateType<T>>;
    groupBy<T extends InspectionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: InspectionGroupByArgs['orderBy'];
    } : {
        orderBy?: InspectionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, InspectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInspectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: InspectionFieldRefs;
}
export interface Prisma__InspectionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    extinguisher<T extends Prisma.FireExtinguisherDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FireExtinguisherDefaultArgs<ExtArgs>>): Prisma.Prisma__FireExtinguisherClient<runtime.Types.Result.GetResult<Prisma.$FireExtinguisherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    scheduledBy<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    inspector<T extends Prisma.Inspection$inspectorArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Inspection$inspectorArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    maintenanceLogs<T extends Prisma.Inspection$maintenanceLogsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Inspection$maintenanceLogsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaintenanceLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface InspectionFieldRefs {
    readonly id: Prisma.FieldRef<"Inspection", 'String'>;
    readonly extinguisherId: Prisma.FieldRef<"Inspection", 'String'>;
    readonly scheduledById: Prisma.FieldRef<"Inspection", 'String'>;
    readonly inspectorId: Prisma.FieldRef<"Inspection", 'String'>;
    readonly scheduledAt: Prisma.FieldRef<"Inspection", 'DateTime'>;
    readonly status: Prisma.FieldRef<"Inspection", 'InspectionStatus'>;
    readonly result: Prisma.FieldRef<"Inspection", 'String'>;
    readonly notes: Prisma.FieldRef<"Inspection", 'String'>;
    readonly completedAt: Prisma.FieldRef<"Inspection", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Inspection", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Inspection", 'DateTime'>;
}
export type InspectionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectionSelect<ExtArgs> | null;
    omit?: Prisma.InspectionOmit<ExtArgs> | null;
    include?: Prisma.InspectionInclude<ExtArgs> | null;
    where: Prisma.InspectionWhereUniqueInput;
};
export type InspectionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectionSelect<ExtArgs> | null;
    omit?: Prisma.InspectionOmit<ExtArgs> | null;
    include?: Prisma.InspectionInclude<ExtArgs> | null;
    where: Prisma.InspectionWhereUniqueInput;
};
export type InspectionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectionSelect<ExtArgs> | null;
    omit?: Prisma.InspectionOmit<ExtArgs> | null;
    include?: Prisma.InspectionInclude<ExtArgs> | null;
    where?: Prisma.InspectionWhereInput;
    orderBy?: Prisma.InspectionOrderByWithRelationInput | Prisma.InspectionOrderByWithRelationInput[];
    cursor?: Prisma.InspectionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InspectionScalarFieldEnum | Prisma.InspectionScalarFieldEnum[];
};
export type InspectionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectionSelect<ExtArgs> | null;
    omit?: Prisma.InspectionOmit<ExtArgs> | null;
    include?: Prisma.InspectionInclude<ExtArgs> | null;
    where?: Prisma.InspectionWhereInput;
    orderBy?: Prisma.InspectionOrderByWithRelationInput | Prisma.InspectionOrderByWithRelationInput[];
    cursor?: Prisma.InspectionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InspectionScalarFieldEnum | Prisma.InspectionScalarFieldEnum[];
};
export type InspectionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectionSelect<ExtArgs> | null;
    omit?: Prisma.InspectionOmit<ExtArgs> | null;
    include?: Prisma.InspectionInclude<ExtArgs> | null;
    where?: Prisma.InspectionWhereInput;
    orderBy?: Prisma.InspectionOrderByWithRelationInput | Prisma.InspectionOrderByWithRelationInput[];
    cursor?: Prisma.InspectionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InspectionScalarFieldEnum | Prisma.InspectionScalarFieldEnum[];
};
export type InspectionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectionSelect<ExtArgs> | null;
    omit?: Prisma.InspectionOmit<ExtArgs> | null;
    include?: Prisma.InspectionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InspectionCreateInput, Prisma.InspectionUncheckedCreateInput>;
};
export type InspectionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.InspectionCreateManyInput | Prisma.InspectionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type InspectionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InspectionOmit<ExtArgs> | null;
    data: Prisma.InspectionCreateManyInput | Prisma.InspectionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.InspectionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type InspectionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectionSelect<ExtArgs> | null;
    omit?: Prisma.InspectionOmit<ExtArgs> | null;
    include?: Prisma.InspectionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InspectionUpdateInput, Prisma.InspectionUncheckedUpdateInput>;
    where: Prisma.InspectionWhereUniqueInput;
};
export type InspectionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.InspectionUpdateManyMutationInput, Prisma.InspectionUncheckedUpdateManyInput>;
    where?: Prisma.InspectionWhereInput;
    limit?: number;
};
export type InspectionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InspectionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InspectionUpdateManyMutationInput, Prisma.InspectionUncheckedUpdateManyInput>;
    where?: Prisma.InspectionWhereInput;
    limit?: number;
    include?: Prisma.InspectionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type InspectionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectionSelect<ExtArgs> | null;
    omit?: Prisma.InspectionOmit<ExtArgs> | null;
    include?: Prisma.InspectionInclude<ExtArgs> | null;
    where: Prisma.InspectionWhereUniqueInput;
    create: Prisma.XOR<Prisma.InspectionCreateInput, Prisma.InspectionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.InspectionUpdateInput, Prisma.InspectionUncheckedUpdateInput>;
};
export type InspectionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectionSelect<ExtArgs> | null;
    omit?: Prisma.InspectionOmit<ExtArgs> | null;
    include?: Prisma.InspectionInclude<ExtArgs> | null;
    where: Prisma.InspectionWhereUniqueInput;
};
export type InspectionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InspectionWhereInput;
    limit?: number;
};
export type Inspection$inspectorArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type Inspection$maintenanceLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaintenanceLogSelect<ExtArgs> | null;
    omit?: Prisma.MaintenanceLogOmit<ExtArgs> | null;
    include?: Prisma.MaintenanceLogInclude<ExtArgs> | null;
    where?: Prisma.MaintenanceLogWhereInput;
    orderBy?: Prisma.MaintenanceLogOrderByWithRelationInput | Prisma.MaintenanceLogOrderByWithRelationInput[];
    cursor?: Prisma.MaintenanceLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MaintenanceLogScalarFieldEnum | Prisma.MaintenanceLogScalarFieldEnum[];
};
export type InspectionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectionSelect<ExtArgs> | null;
    omit?: Prisma.InspectionOmit<ExtArgs> | null;
    include?: Prisma.InspectionInclude<ExtArgs> | null;
};
