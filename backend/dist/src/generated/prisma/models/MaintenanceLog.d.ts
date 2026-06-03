import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type MaintenanceLogModel = runtime.Types.Result.DefaultSelection<Prisma.$MaintenanceLogPayload>;
export type AggregateMaintenanceLog = {
    _count: MaintenanceLogCountAggregateOutputType | null;
    _min: MaintenanceLogMinAggregateOutputType | null;
    _max: MaintenanceLogMaxAggregateOutputType | null;
};
export type MaintenanceLogMinAggregateOutputType = {
    id: string | null;
    extinguisherId: string | null;
    inspectorId: string | null;
    inspectionId: string | null;
    actionsTaken: string | null;
    conditionNoted: $Enums.MaintenanceCondition | null;
    actionDate: Date | null;
    createdAt: Date | null;
};
export type MaintenanceLogMaxAggregateOutputType = {
    id: string | null;
    extinguisherId: string | null;
    inspectorId: string | null;
    inspectionId: string | null;
    actionsTaken: string | null;
    conditionNoted: $Enums.MaintenanceCondition | null;
    actionDate: Date | null;
    createdAt: Date | null;
};
export type MaintenanceLogCountAggregateOutputType = {
    id: number;
    extinguisherId: number;
    inspectorId: number;
    inspectionId: number;
    actionsTaken: number;
    conditionNoted: number;
    actionDate: number;
    createdAt: number;
    _all: number;
};
export type MaintenanceLogMinAggregateInputType = {
    id?: true;
    extinguisherId?: true;
    inspectorId?: true;
    inspectionId?: true;
    actionsTaken?: true;
    conditionNoted?: true;
    actionDate?: true;
    createdAt?: true;
};
export type MaintenanceLogMaxAggregateInputType = {
    id?: true;
    extinguisherId?: true;
    inspectorId?: true;
    inspectionId?: true;
    actionsTaken?: true;
    conditionNoted?: true;
    actionDate?: true;
    createdAt?: true;
};
export type MaintenanceLogCountAggregateInputType = {
    id?: true;
    extinguisherId?: true;
    inspectorId?: true;
    inspectionId?: true;
    actionsTaken?: true;
    conditionNoted?: true;
    actionDate?: true;
    createdAt?: true;
    _all?: true;
};
export type MaintenanceLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaintenanceLogWhereInput;
    orderBy?: Prisma.MaintenanceLogOrderByWithRelationInput | Prisma.MaintenanceLogOrderByWithRelationInput[];
    cursor?: Prisma.MaintenanceLogWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | MaintenanceLogCountAggregateInputType;
    _min?: MaintenanceLogMinAggregateInputType;
    _max?: MaintenanceLogMaxAggregateInputType;
};
export type GetMaintenanceLogAggregateType<T extends MaintenanceLogAggregateArgs> = {
    [P in keyof T & keyof AggregateMaintenanceLog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMaintenanceLog[P]> : Prisma.GetScalarType<T[P], AggregateMaintenanceLog[P]>;
};
export type MaintenanceLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaintenanceLogWhereInput;
    orderBy?: Prisma.MaintenanceLogOrderByWithAggregationInput | Prisma.MaintenanceLogOrderByWithAggregationInput[];
    by: Prisma.MaintenanceLogScalarFieldEnum[] | Prisma.MaintenanceLogScalarFieldEnum;
    having?: Prisma.MaintenanceLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MaintenanceLogCountAggregateInputType | true;
    _min?: MaintenanceLogMinAggregateInputType;
    _max?: MaintenanceLogMaxAggregateInputType;
};
export type MaintenanceLogGroupByOutputType = {
    id: string;
    extinguisherId: string;
    inspectorId: string;
    inspectionId: string | null;
    actionsTaken: string;
    conditionNoted: $Enums.MaintenanceCondition;
    actionDate: Date;
    createdAt: Date;
    _count: MaintenanceLogCountAggregateOutputType | null;
    _min: MaintenanceLogMinAggregateOutputType | null;
    _max: MaintenanceLogMaxAggregateOutputType | null;
};
export type GetMaintenanceLogGroupByPayload<T extends MaintenanceLogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MaintenanceLogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MaintenanceLogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MaintenanceLogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MaintenanceLogGroupByOutputType[P]>;
}>>;
export type MaintenanceLogWhereInput = {
    AND?: Prisma.MaintenanceLogWhereInput | Prisma.MaintenanceLogWhereInput[];
    OR?: Prisma.MaintenanceLogWhereInput[];
    NOT?: Prisma.MaintenanceLogWhereInput | Prisma.MaintenanceLogWhereInput[];
    id?: Prisma.StringFilter<"MaintenanceLog"> | string;
    extinguisherId?: Prisma.StringFilter<"MaintenanceLog"> | string;
    inspectorId?: Prisma.StringFilter<"MaintenanceLog"> | string;
    inspectionId?: Prisma.StringNullableFilter<"MaintenanceLog"> | string | null;
    actionsTaken?: Prisma.StringFilter<"MaintenanceLog"> | string;
    conditionNoted?: Prisma.EnumMaintenanceConditionFilter<"MaintenanceLog"> | $Enums.MaintenanceCondition;
    actionDate?: Prisma.DateTimeFilter<"MaintenanceLog"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"MaintenanceLog"> | Date | string;
    extinguisher?: Prisma.XOR<Prisma.FireExtinguisherScalarRelationFilter, Prisma.FireExtinguisherWhereInput>;
    inspector?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    inspection?: Prisma.XOR<Prisma.InspectionNullableScalarRelationFilter, Prisma.InspectionWhereInput> | null;
};
export type MaintenanceLogOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    extinguisherId?: Prisma.SortOrder;
    inspectorId?: Prisma.SortOrder;
    inspectionId?: Prisma.SortOrderInput | Prisma.SortOrder;
    actionsTaken?: Prisma.SortOrder;
    conditionNoted?: Prisma.SortOrder;
    actionDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    extinguisher?: Prisma.FireExtinguisherOrderByWithRelationInput;
    inspector?: Prisma.UserOrderByWithRelationInput;
    inspection?: Prisma.InspectionOrderByWithRelationInput;
};
export type MaintenanceLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.MaintenanceLogWhereInput | Prisma.MaintenanceLogWhereInput[];
    OR?: Prisma.MaintenanceLogWhereInput[];
    NOT?: Prisma.MaintenanceLogWhereInput | Prisma.MaintenanceLogWhereInput[];
    extinguisherId?: Prisma.StringFilter<"MaintenanceLog"> | string;
    inspectorId?: Prisma.StringFilter<"MaintenanceLog"> | string;
    inspectionId?: Prisma.StringNullableFilter<"MaintenanceLog"> | string | null;
    actionsTaken?: Prisma.StringFilter<"MaintenanceLog"> | string;
    conditionNoted?: Prisma.EnumMaintenanceConditionFilter<"MaintenanceLog"> | $Enums.MaintenanceCondition;
    actionDate?: Prisma.DateTimeFilter<"MaintenanceLog"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"MaintenanceLog"> | Date | string;
    extinguisher?: Prisma.XOR<Prisma.FireExtinguisherScalarRelationFilter, Prisma.FireExtinguisherWhereInput>;
    inspector?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    inspection?: Prisma.XOR<Prisma.InspectionNullableScalarRelationFilter, Prisma.InspectionWhereInput> | null;
}, "id">;
export type MaintenanceLogOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    extinguisherId?: Prisma.SortOrder;
    inspectorId?: Prisma.SortOrder;
    inspectionId?: Prisma.SortOrderInput | Prisma.SortOrder;
    actionsTaken?: Prisma.SortOrder;
    conditionNoted?: Prisma.SortOrder;
    actionDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.MaintenanceLogCountOrderByAggregateInput;
    _max?: Prisma.MaintenanceLogMaxOrderByAggregateInput;
    _min?: Prisma.MaintenanceLogMinOrderByAggregateInput;
};
export type MaintenanceLogScalarWhereWithAggregatesInput = {
    AND?: Prisma.MaintenanceLogScalarWhereWithAggregatesInput | Prisma.MaintenanceLogScalarWhereWithAggregatesInput[];
    OR?: Prisma.MaintenanceLogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MaintenanceLogScalarWhereWithAggregatesInput | Prisma.MaintenanceLogScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"MaintenanceLog"> | string;
    extinguisherId?: Prisma.StringWithAggregatesFilter<"MaintenanceLog"> | string;
    inspectorId?: Prisma.StringWithAggregatesFilter<"MaintenanceLog"> | string;
    inspectionId?: Prisma.StringNullableWithAggregatesFilter<"MaintenanceLog"> | string | null;
    actionsTaken?: Prisma.StringWithAggregatesFilter<"MaintenanceLog"> | string;
    conditionNoted?: Prisma.EnumMaintenanceConditionWithAggregatesFilter<"MaintenanceLog"> | $Enums.MaintenanceCondition;
    actionDate?: Prisma.DateTimeWithAggregatesFilter<"MaintenanceLog"> | Date | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"MaintenanceLog"> | Date | string;
};
export type MaintenanceLogCreateInput = {
    id?: string;
    actionsTaken: string;
    conditionNoted: $Enums.MaintenanceCondition;
    actionDate: Date | string;
    createdAt?: Date | string;
    extinguisher: Prisma.FireExtinguisherCreateNestedOneWithoutMaintenanceLogsInput;
    inspector: Prisma.UserCreateNestedOneWithoutMaintenanceLogsInput;
    inspection?: Prisma.InspectionCreateNestedOneWithoutMaintenanceLogsInput;
};
export type MaintenanceLogUncheckedCreateInput = {
    id?: string;
    extinguisherId: string;
    inspectorId: string;
    inspectionId?: string | null;
    actionsTaken: string;
    conditionNoted: $Enums.MaintenanceCondition;
    actionDate: Date | string;
    createdAt?: Date | string;
};
export type MaintenanceLogUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actionsTaken?: Prisma.StringFieldUpdateOperationsInput | string;
    conditionNoted?: Prisma.EnumMaintenanceConditionFieldUpdateOperationsInput | $Enums.MaintenanceCondition;
    actionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    extinguisher?: Prisma.FireExtinguisherUpdateOneRequiredWithoutMaintenanceLogsNestedInput;
    inspector?: Prisma.UserUpdateOneRequiredWithoutMaintenanceLogsNestedInput;
    inspection?: Prisma.InspectionUpdateOneWithoutMaintenanceLogsNestedInput;
};
export type MaintenanceLogUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    extinguisherId?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectorId?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    actionsTaken?: Prisma.StringFieldUpdateOperationsInput | string;
    conditionNoted?: Prisma.EnumMaintenanceConditionFieldUpdateOperationsInput | $Enums.MaintenanceCondition;
    actionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MaintenanceLogCreateManyInput = {
    id?: string;
    extinguisherId: string;
    inspectorId: string;
    inspectionId?: string | null;
    actionsTaken: string;
    conditionNoted: $Enums.MaintenanceCondition;
    actionDate: Date | string;
    createdAt?: Date | string;
};
export type MaintenanceLogUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actionsTaken?: Prisma.StringFieldUpdateOperationsInput | string;
    conditionNoted?: Prisma.EnumMaintenanceConditionFieldUpdateOperationsInput | $Enums.MaintenanceCondition;
    actionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MaintenanceLogUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    extinguisherId?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectorId?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    actionsTaken?: Prisma.StringFieldUpdateOperationsInput | string;
    conditionNoted?: Prisma.EnumMaintenanceConditionFieldUpdateOperationsInput | $Enums.MaintenanceCondition;
    actionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MaintenanceLogListRelationFilter = {
    every?: Prisma.MaintenanceLogWhereInput;
    some?: Prisma.MaintenanceLogWhereInput;
    none?: Prisma.MaintenanceLogWhereInput;
};
export type MaintenanceLogOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MaintenanceLogCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    extinguisherId?: Prisma.SortOrder;
    inspectorId?: Prisma.SortOrder;
    inspectionId?: Prisma.SortOrder;
    actionsTaken?: Prisma.SortOrder;
    conditionNoted?: Prisma.SortOrder;
    actionDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MaintenanceLogMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    extinguisherId?: Prisma.SortOrder;
    inspectorId?: Prisma.SortOrder;
    inspectionId?: Prisma.SortOrder;
    actionsTaken?: Prisma.SortOrder;
    conditionNoted?: Prisma.SortOrder;
    actionDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MaintenanceLogMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    extinguisherId?: Prisma.SortOrder;
    inspectorId?: Prisma.SortOrder;
    inspectionId?: Prisma.SortOrder;
    actionsTaken?: Prisma.SortOrder;
    conditionNoted?: Prisma.SortOrder;
    actionDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MaintenanceLogCreateNestedManyWithoutInspectorInput = {
    create?: Prisma.XOR<Prisma.MaintenanceLogCreateWithoutInspectorInput, Prisma.MaintenanceLogUncheckedCreateWithoutInspectorInput> | Prisma.MaintenanceLogCreateWithoutInspectorInput[] | Prisma.MaintenanceLogUncheckedCreateWithoutInspectorInput[];
    connectOrCreate?: Prisma.MaintenanceLogCreateOrConnectWithoutInspectorInput | Prisma.MaintenanceLogCreateOrConnectWithoutInspectorInput[];
    createMany?: Prisma.MaintenanceLogCreateManyInspectorInputEnvelope;
    connect?: Prisma.MaintenanceLogWhereUniqueInput | Prisma.MaintenanceLogWhereUniqueInput[];
};
export type MaintenanceLogUncheckedCreateNestedManyWithoutInspectorInput = {
    create?: Prisma.XOR<Prisma.MaintenanceLogCreateWithoutInspectorInput, Prisma.MaintenanceLogUncheckedCreateWithoutInspectorInput> | Prisma.MaintenanceLogCreateWithoutInspectorInput[] | Prisma.MaintenanceLogUncheckedCreateWithoutInspectorInput[];
    connectOrCreate?: Prisma.MaintenanceLogCreateOrConnectWithoutInspectorInput | Prisma.MaintenanceLogCreateOrConnectWithoutInspectorInput[];
    createMany?: Prisma.MaintenanceLogCreateManyInspectorInputEnvelope;
    connect?: Prisma.MaintenanceLogWhereUniqueInput | Prisma.MaintenanceLogWhereUniqueInput[];
};
export type MaintenanceLogUpdateManyWithoutInspectorNestedInput = {
    create?: Prisma.XOR<Prisma.MaintenanceLogCreateWithoutInspectorInput, Prisma.MaintenanceLogUncheckedCreateWithoutInspectorInput> | Prisma.MaintenanceLogCreateWithoutInspectorInput[] | Prisma.MaintenanceLogUncheckedCreateWithoutInspectorInput[];
    connectOrCreate?: Prisma.MaintenanceLogCreateOrConnectWithoutInspectorInput | Prisma.MaintenanceLogCreateOrConnectWithoutInspectorInput[];
    upsert?: Prisma.MaintenanceLogUpsertWithWhereUniqueWithoutInspectorInput | Prisma.MaintenanceLogUpsertWithWhereUniqueWithoutInspectorInput[];
    createMany?: Prisma.MaintenanceLogCreateManyInspectorInputEnvelope;
    set?: Prisma.MaintenanceLogWhereUniqueInput | Prisma.MaintenanceLogWhereUniqueInput[];
    disconnect?: Prisma.MaintenanceLogWhereUniqueInput | Prisma.MaintenanceLogWhereUniqueInput[];
    delete?: Prisma.MaintenanceLogWhereUniqueInput | Prisma.MaintenanceLogWhereUniqueInput[];
    connect?: Prisma.MaintenanceLogWhereUniqueInput | Prisma.MaintenanceLogWhereUniqueInput[];
    update?: Prisma.MaintenanceLogUpdateWithWhereUniqueWithoutInspectorInput | Prisma.MaintenanceLogUpdateWithWhereUniqueWithoutInspectorInput[];
    updateMany?: Prisma.MaintenanceLogUpdateManyWithWhereWithoutInspectorInput | Prisma.MaintenanceLogUpdateManyWithWhereWithoutInspectorInput[];
    deleteMany?: Prisma.MaintenanceLogScalarWhereInput | Prisma.MaintenanceLogScalarWhereInput[];
};
export type MaintenanceLogUncheckedUpdateManyWithoutInspectorNestedInput = {
    create?: Prisma.XOR<Prisma.MaintenanceLogCreateWithoutInspectorInput, Prisma.MaintenanceLogUncheckedCreateWithoutInspectorInput> | Prisma.MaintenanceLogCreateWithoutInspectorInput[] | Prisma.MaintenanceLogUncheckedCreateWithoutInspectorInput[];
    connectOrCreate?: Prisma.MaintenanceLogCreateOrConnectWithoutInspectorInput | Prisma.MaintenanceLogCreateOrConnectWithoutInspectorInput[];
    upsert?: Prisma.MaintenanceLogUpsertWithWhereUniqueWithoutInspectorInput | Prisma.MaintenanceLogUpsertWithWhereUniqueWithoutInspectorInput[];
    createMany?: Prisma.MaintenanceLogCreateManyInspectorInputEnvelope;
    set?: Prisma.MaintenanceLogWhereUniqueInput | Prisma.MaintenanceLogWhereUniqueInput[];
    disconnect?: Prisma.MaintenanceLogWhereUniqueInput | Prisma.MaintenanceLogWhereUniqueInput[];
    delete?: Prisma.MaintenanceLogWhereUniqueInput | Prisma.MaintenanceLogWhereUniqueInput[];
    connect?: Prisma.MaintenanceLogWhereUniqueInput | Prisma.MaintenanceLogWhereUniqueInput[];
    update?: Prisma.MaintenanceLogUpdateWithWhereUniqueWithoutInspectorInput | Prisma.MaintenanceLogUpdateWithWhereUniqueWithoutInspectorInput[];
    updateMany?: Prisma.MaintenanceLogUpdateManyWithWhereWithoutInspectorInput | Prisma.MaintenanceLogUpdateManyWithWhereWithoutInspectorInput[];
    deleteMany?: Prisma.MaintenanceLogScalarWhereInput | Prisma.MaintenanceLogScalarWhereInput[];
};
export type MaintenanceLogCreateNestedManyWithoutExtinguisherInput = {
    create?: Prisma.XOR<Prisma.MaintenanceLogCreateWithoutExtinguisherInput, Prisma.MaintenanceLogUncheckedCreateWithoutExtinguisherInput> | Prisma.MaintenanceLogCreateWithoutExtinguisherInput[] | Prisma.MaintenanceLogUncheckedCreateWithoutExtinguisherInput[];
    connectOrCreate?: Prisma.MaintenanceLogCreateOrConnectWithoutExtinguisherInput | Prisma.MaintenanceLogCreateOrConnectWithoutExtinguisherInput[];
    createMany?: Prisma.MaintenanceLogCreateManyExtinguisherInputEnvelope;
    connect?: Prisma.MaintenanceLogWhereUniqueInput | Prisma.MaintenanceLogWhereUniqueInput[];
};
export type MaintenanceLogUncheckedCreateNestedManyWithoutExtinguisherInput = {
    create?: Prisma.XOR<Prisma.MaintenanceLogCreateWithoutExtinguisherInput, Prisma.MaintenanceLogUncheckedCreateWithoutExtinguisherInput> | Prisma.MaintenanceLogCreateWithoutExtinguisherInput[] | Prisma.MaintenanceLogUncheckedCreateWithoutExtinguisherInput[];
    connectOrCreate?: Prisma.MaintenanceLogCreateOrConnectWithoutExtinguisherInput | Prisma.MaintenanceLogCreateOrConnectWithoutExtinguisherInput[];
    createMany?: Prisma.MaintenanceLogCreateManyExtinguisherInputEnvelope;
    connect?: Prisma.MaintenanceLogWhereUniqueInput | Prisma.MaintenanceLogWhereUniqueInput[];
};
export type MaintenanceLogUpdateManyWithoutExtinguisherNestedInput = {
    create?: Prisma.XOR<Prisma.MaintenanceLogCreateWithoutExtinguisherInput, Prisma.MaintenanceLogUncheckedCreateWithoutExtinguisherInput> | Prisma.MaintenanceLogCreateWithoutExtinguisherInput[] | Prisma.MaintenanceLogUncheckedCreateWithoutExtinguisherInput[];
    connectOrCreate?: Prisma.MaintenanceLogCreateOrConnectWithoutExtinguisherInput | Prisma.MaintenanceLogCreateOrConnectWithoutExtinguisherInput[];
    upsert?: Prisma.MaintenanceLogUpsertWithWhereUniqueWithoutExtinguisherInput | Prisma.MaintenanceLogUpsertWithWhereUniqueWithoutExtinguisherInput[];
    createMany?: Prisma.MaintenanceLogCreateManyExtinguisherInputEnvelope;
    set?: Prisma.MaintenanceLogWhereUniqueInput | Prisma.MaintenanceLogWhereUniqueInput[];
    disconnect?: Prisma.MaintenanceLogWhereUniqueInput | Prisma.MaintenanceLogWhereUniqueInput[];
    delete?: Prisma.MaintenanceLogWhereUniqueInput | Prisma.MaintenanceLogWhereUniqueInput[];
    connect?: Prisma.MaintenanceLogWhereUniqueInput | Prisma.MaintenanceLogWhereUniqueInput[];
    update?: Prisma.MaintenanceLogUpdateWithWhereUniqueWithoutExtinguisherInput | Prisma.MaintenanceLogUpdateWithWhereUniqueWithoutExtinguisherInput[];
    updateMany?: Prisma.MaintenanceLogUpdateManyWithWhereWithoutExtinguisherInput | Prisma.MaintenanceLogUpdateManyWithWhereWithoutExtinguisherInput[];
    deleteMany?: Prisma.MaintenanceLogScalarWhereInput | Prisma.MaintenanceLogScalarWhereInput[];
};
export type MaintenanceLogUncheckedUpdateManyWithoutExtinguisherNestedInput = {
    create?: Prisma.XOR<Prisma.MaintenanceLogCreateWithoutExtinguisherInput, Prisma.MaintenanceLogUncheckedCreateWithoutExtinguisherInput> | Prisma.MaintenanceLogCreateWithoutExtinguisherInput[] | Prisma.MaintenanceLogUncheckedCreateWithoutExtinguisherInput[];
    connectOrCreate?: Prisma.MaintenanceLogCreateOrConnectWithoutExtinguisherInput | Prisma.MaintenanceLogCreateOrConnectWithoutExtinguisherInput[];
    upsert?: Prisma.MaintenanceLogUpsertWithWhereUniqueWithoutExtinguisherInput | Prisma.MaintenanceLogUpsertWithWhereUniqueWithoutExtinguisherInput[];
    createMany?: Prisma.MaintenanceLogCreateManyExtinguisherInputEnvelope;
    set?: Prisma.MaintenanceLogWhereUniqueInput | Prisma.MaintenanceLogWhereUniqueInput[];
    disconnect?: Prisma.MaintenanceLogWhereUniqueInput | Prisma.MaintenanceLogWhereUniqueInput[];
    delete?: Prisma.MaintenanceLogWhereUniqueInput | Prisma.MaintenanceLogWhereUniqueInput[];
    connect?: Prisma.MaintenanceLogWhereUniqueInput | Prisma.MaintenanceLogWhereUniqueInput[];
    update?: Prisma.MaintenanceLogUpdateWithWhereUniqueWithoutExtinguisherInput | Prisma.MaintenanceLogUpdateWithWhereUniqueWithoutExtinguisherInput[];
    updateMany?: Prisma.MaintenanceLogUpdateManyWithWhereWithoutExtinguisherInput | Prisma.MaintenanceLogUpdateManyWithWhereWithoutExtinguisherInput[];
    deleteMany?: Prisma.MaintenanceLogScalarWhereInput | Prisma.MaintenanceLogScalarWhereInput[];
};
export type MaintenanceLogCreateNestedManyWithoutInspectionInput = {
    create?: Prisma.XOR<Prisma.MaintenanceLogCreateWithoutInspectionInput, Prisma.MaintenanceLogUncheckedCreateWithoutInspectionInput> | Prisma.MaintenanceLogCreateWithoutInspectionInput[] | Prisma.MaintenanceLogUncheckedCreateWithoutInspectionInput[];
    connectOrCreate?: Prisma.MaintenanceLogCreateOrConnectWithoutInspectionInput | Prisma.MaintenanceLogCreateOrConnectWithoutInspectionInput[];
    createMany?: Prisma.MaintenanceLogCreateManyInspectionInputEnvelope;
    connect?: Prisma.MaintenanceLogWhereUniqueInput | Prisma.MaintenanceLogWhereUniqueInput[];
};
export type MaintenanceLogUncheckedCreateNestedManyWithoutInspectionInput = {
    create?: Prisma.XOR<Prisma.MaintenanceLogCreateWithoutInspectionInput, Prisma.MaintenanceLogUncheckedCreateWithoutInspectionInput> | Prisma.MaintenanceLogCreateWithoutInspectionInput[] | Prisma.MaintenanceLogUncheckedCreateWithoutInspectionInput[];
    connectOrCreate?: Prisma.MaintenanceLogCreateOrConnectWithoutInspectionInput | Prisma.MaintenanceLogCreateOrConnectWithoutInspectionInput[];
    createMany?: Prisma.MaintenanceLogCreateManyInspectionInputEnvelope;
    connect?: Prisma.MaintenanceLogWhereUniqueInput | Prisma.MaintenanceLogWhereUniqueInput[];
};
export type MaintenanceLogUpdateManyWithoutInspectionNestedInput = {
    create?: Prisma.XOR<Prisma.MaintenanceLogCreateWithoutInspectionInput, Prisma.MaintenanceLogUncheckedCreateWithoutInspectionInput> | Prisma.MaintenanceLogCreateWithoutInspectionInput[] | Prisma.MaintenanceLogUncheckedCreateWithoutInspectionInput[];
    connectOrCreate?: Prisma.MaintenanceLogCreateOrConnectWithoutInspectionInput | Prisma.MaintenanceLogCreateOrConnectWithoutInspectionInput[];
    upsert?: Prisma.MaintenanceLogUpsertWithWhereUniqueWithoutInspectionInput | Prisma.MaintenanceLogUpsertWithWhereUniqueWithoutInspectionInput[];
    createMany?: Prisma.MaintenanceLogCreateManyInspectionInputEnvelope;
    set?: Prisma.MaintenanceLogWhereUniqueInput | Prisma.MaintenanceLogWhereUniqueInput[];
    disconnect?: Prisma.MaintenanceLogWhereUniqueInput | Prisma.MaintenanceLogWhereUniqueInput[];
    delete?: Prisma.MaintenanceLogWhereUniqueInput | Prisma.MaintenanceLogWhereUniqueInput[];
    connect?: Prisma.MaintenanceLogWhereUniqueInput | Prisma.MaintenanceLogWhereUniqueInput[];
    update?: Prisma.MaintenanceLogUpdateWithWhereUniqueWithoutInspectionInput | Prisma.MaintenanceLogUpdateWithWhereUniqueWithoutInspectionInput[];
    updateMany?: Prisma.MaintenanceLogUpdateManyWithWhereWithoutInspectionInput | Prisma.MaintenanceLogUpdateManyWithWhereWithoutInspectionInput[];
    deleteMany?: Prisma.MaintenanceLogScalarWhereInput | Prisma.MaintenanceLogScalarWhereInput[];
};
export type MaintenanceLogUncheckedUpdateManyWithoutInspectionNestedInput = {
    create?: Prisma.XOR<Prisma.MaintenanceLogCreateWithoutInspectionInput, Prisma.MaintenanceLogUncheckedCreateWithoutInspectionInput> | Prisma.MaintenanceLogCreateWithoutInspectionInput[] | Prisma.MaintenanceLogUncheckedCreateWithoutInspectionInput[];
    connectOrCreate?: Prisma.MaintenanceLogCreateOrConnectWithoutInspectionInput | Prisma.MaintenanceLogCreateOrConnectWithoutInspectionInput[];
    upsert?: Prisma.MaintenanceLogUpsertWithWhereUniqueWithoutInspectionInput | Prisma.MaintenanceLogUpsertWithWhereUniqueWithoutInspectionInput[];
    createMany?: Prisma.MaintenanceLogCreateManyInspectionInputEnvelope;
    set?: Prisma.MaintenanceLogWhereUniqueInput | Prisma.MaintenanceLogWhereUniqueInput[];
    disconnect?: Prisma.MaintenanceLogWhereUniqueInput | Prisma.MaintenanceLogWhereUniqueInput[];
    delete?: Prisma.MaintenanceLogWhereUniqueInput | Prisma.MaintenanceLogWhereUniqueInput[];
    connect?: Prisma.MaintenanceLogWhereUniqueInput | Prisma.MaintenanceLogWhereUniqueInput[];
    update?: Prisma.MaintenanceLogUpdateWithWhereUniqueWithoutInspectionInput | Prisma.MaintenanceLogUpdateWithWhereUniqueWithoutInspectionInput[];
    updateMany?: Prisma.MaintenanceLogUpdateManyWithWhereWithoutInspectionInput | Prisma.MaintenanceLogUpdateManyWithWhereWithoutInspectionInput[];
    deleteMany?: Prisma.MaintenanceLogScalarWhereInput | Prisma.MaintenanceLogScalarWhereInput[];
};
export type EnumMaintenanceConditionFieldUpdateOperationsInput = {
    set?: $Enums.MaintenanceCondition;
};
export type MaintenanceLogCreateWithoutInspectorInput = {
    id?: string;
    actionsTaken: string;
    conditionNoted: $Enums.MaintenanceCondition;
    actionDate: Date | string;
    createdAt?: Date | string;
    extinguisher: Prisma.FireExtinguisherCreateNestedOneWithoutMaintenanceLogsInput;
    inspection?: Prisma.InspectionCreateNestedOneWithoutMaintenanceLogsInput;
};
export type MaintenanceLogUncheckedCreateWithoutInspectorInput = {
    id?: string;
    extinguisherId: string;
    inspectionId?: string | null;
    actionsTaken: string;
    conditionNoted: $Enums.MaintenanceCondition;
    actionDate: Date | string;
    createdAt?: Date | string;
};
export type MaintenanceLogCreateOrConnectWithoutInspectorInput = {
    where: Prisma.MaintenanceLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaintenanceLogCreateWithoutInspectorInput, Prisma.MaintenanceLogUncheckedCreateWithoutInspectorInput>;
};
export type MaintenanceLogCreateManyInspectorInputEnvelope = {
    data: Prisma.MaintenanceLogCreateManyInspectorInput | Prisma.MaintenanceLogCreateManyInspectorInput[];
    skipDuplicates?: boolean;
};
export type MaintenanceLogUpsertWithWhereUniqueWithoutInspectorInput = {
    where: Prisma.MaintenanceLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.MaintenanceLogUpdateWithoutInspectorInput, Prisma.MaintenanceLogUncheckedUpdateWithoutInspectorInput>;
    create: Prisma.XOR<Prisma.MaintenanceLogCreateWithoutInspectorInput, Prisma.MaintenanceLogUncheckedCreateWithoutInspectorInput>;
};
export type MaintenanceLogUpdateWithWhereUniqueWithoutInspectorInput = {
    where: Prisma.MaintenanceLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.MaintenanceLogUpdateWithoutInspectorInput, Prisma.MaintenanceLogUncheckedUpdateWithoutInspectorInput>;
};
export type MaintenanceLogUpdateManyWithWhereWithoutInspectorInput = {
    where: Prisma.MaintenanceLogScalarWhereInput;
    data: Prisma.XOR<Prisma.MaintenanceLogUpdateManyMutationInput, Prisma.MaintenanceLogUncheckedUpdateManyWithoutInspectorInput>;
};
export type MaintenanceLogScalarWhereInput = {
    AND?: Prisma.MaintenanceLogScalarWhereInput | Prisma.MaintenanceLogScalarWhereInput[];
    OR?: Prisma.MaintenanceLogScalarWhereInput[];
    NOT?: Prisma.MaintenanceLogScalarWhereInput | Prisma.MaintenanceLogScalarWhereInput[];
    id?: Prisma.StringFilter<"MaintenanceLog"> | string;
    extinguisherId?: Prisma.StringFilter<"MaintenanceLog"> | string;
    inspectorId?: Prisma.StringFilter<"MaintenanceLog"> | string;
    inspectionId?: Prisma.StringNullableFilter<"MaintenanceLog"> | string | null;
    actionsTaken?: Prisma.StringFilter<"MaintenanceLog"> | string;
    conditionNoted?: Prisma.EnumMaintenanceConditionFilter<"MaintenanceLog"> | $Enums.MaintenanceCondition;
    actionDate?: Prisma.DateTimeFilter<"MaintenanceLog"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"MaintenanceLog"> | Date | string;
};
export type MaintenanceLogCreateWithoutExtinguisherInput = {
    id?: string;
    actionsTaken: string;
    conditionNoted: $Enums.MaintenanceCondition;
    actionDate: Date | string;
    createdAt?: Date | string;
    inspector: Prisma.UserCreateNestedOneWithoutMaintenanceLogsInput;
    inspection?: Prisma.InspectionCreateNestedOneWithoutMaintenanceLogsInput;
};
export type MaintenanceLogUncheckedCreateWithoutExtinguisherInput = {
    id?: string;
    inspectorId: string;
    inspectionId?: string | null;
    actionsTaken: string;
    conditionNoted: $Enums.MaintenanceCondition;
    actionDate: Date | string;
    createdAt?: Date | string;
};
export type MaintenanceLogCreateOrConnectWithoutExtinguisherInput = {
    where: Prisma.MaintenanceLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaintenanceLogCreateWithoutExtinguisherInput, Prisma.MaintenanceLogUncheckedCreateWithoutExtinguisherInput>;
};
export type MaintenanceLogCreateManyExtinguisherInputEnvelope = {
    data: Prisma.MaintenanceLogCreateManyExtinguisherInput | Prisma.MaintenanceLogCreateManyExtinguisherInput[];
    skipDuplicates?: boolean;
};
export type MaintenanceLogUpsertWithWhereUniqueWithoutExtinguisherInput = {
    where: Prisma.MaintenanceLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.MaintenanceLogUpdateWithoutExtinguisherInput, Prisma.MaintenanceLogUncheckedUpdateWithoutExtinguisherInput>;
    create: Prisma.XOR<Prisma.MaintenanceLogCreateWithoutExtinguisherInput, Prisma.MaintenanceLogUncheckedCreateWithoutExtinguisherInput>;
};
export type MaintenanceLogUpdateWithWhereUniqueWithoutExtinguisherInput = {
    where: Prisma.MaintenanceLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.MaintenanceLogUpdateWithoutExtinguisherInput, Prisma.MaintenanceLogUncheckedUpdateWithoutExtinguisherInput>;
};
export type MaintenanceLogUpdateManyWithWhereWithoutExtinguisherInput = {
    where: Prisma.MaintenanceLogScalarWhereInput;
    data: Prisma.XOR<Prisma.MaintenanceLogUpdateManyMutationInput, Prisma.MaintenanceLogUncheckedUpdateManyWithoutExtinguisherInput>;
};
export type MaintenanceLogCreateWithoutInspectionInput = {
    id?: string;
    actionsTaken: string;
    conditionNoted: $Enums.MaintenanceCondition;
    actionDate: Date | string;
    createdAt?: Date | string;
    extinguisher: Prisma.FireExtinguisherCreateNestedOneWithoutMaintenanceLogsInput;
    inspector: Prisma.UserCreateNestedOneWithoutMaintenanceLogsInput;
};
export type MaintenanceLogUncheckedCreateWithoutInspectionInput = {
    id?: string;
    extinguisherId: string;
    inspectorId: string;
    actionsTaken: string;
    conditionNoted: $Enums.MaintenanceCondition;
    actionDate: Date | string;
    createdAt?: Date | string;
};
export type MaintenanceLogCreateOrConnectWithoutInspectionInput = {
    where: Prisma.MaintenanceLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaintenanceLogCreateWithoutInspectionInput, Prisma.MaintenanceLogUncheckedCreateWithoutInspectionInput>;
};
export type MaintenanceLogCreateManyInspectionInputEnvelope = {
    data: Prisma.MaintenanceLogCreateManyInspectionInput | Prisma.MaintenanceLogCreateManyInspectionInput[];
    skipDuplicates?: boolean;
};
export type MaintenanceLogUpsertWithWhereUniqueWithoutInspectionInput = {
    where: Prisma.MaintenanceLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.MaintenanceLogUpdateWithoutInspectionInput, Prisma.MaintenanceLogUncheckedUpdateWithoutInspectionInput>;
    create: Prisma.XOR<Prisma.MaintenanceLogCreateWithoutInspectionInput, Prisma.MaintenanceLogUncheckedCreateWithoutInspectionInput>;
};
export type MaintenanceLogUpdateWithWhereUniqueWithoutInspectionInput = {
    where: Prisma.MaintenanceLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.MaintenanceLogUpdateWithoutInspectionInput, Prisma.MaintenanceLogUncheckedUpdateWithoutInspectionInput>;
};
export type MaintenanceLogUpdateManyWithWhereWithoutInspectionInput = {
    where: Prisma.MaintenanceLogScalarWhereInput;
    data: Prisma.XOR<Prisma.MaintenanceLogUpdateManyMutationInput, Prisma.MaintenanceLogUncheckedUpdateManyWithoutInspectionInput>;
};
export type MaintenanceLogCreateManyInspectorInput = {
    id?: string;
    extinguisherId: string;
    inspectionId?: string | null;
    actionsTaken: string;
    conditionNoted: $Enums.MaintenanceCondition;
    actionDate: Date | string;
    createdAt?: Date | string;
};
export type MaintenanceLogUpdateWithoutInspectorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actionsTaken?: Prisma.StringFieldUpdateOperationsInput | string;
    conditionNoted?: Prisma.EnumMaintenanceConditionFieldUpdateOperationsInput | $Enums.MaintenanceCondition;
    actionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    extinguisher?: Prisma.FireExtinguisherUpdateOneRequiredWithoutMaintenanceLogsNestedInput;
    inspection?: Prisma.InspectionUpdateOneWithoutMaintenanceLogsNestedInput;
};
export type MaintenanceLogUncheckedUpdateWithoutInspectorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    extinguisherId?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    actionsTaken?: Prisma.StringFieldUpdateOperationsInput | string;
    conditionNoted?: Prisma.EnumMaintenanceConditionFieldUpdateOperationsInput | $Enums.MaintenanceCondition;
    actionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MaintenanceLogUncheckedUpdateManyWithoutInspectorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    extinguisherId?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    actionsTaken?: Prisma.StringFieldUpdateOperationsInput | string;
    conditionNoted?: Prisma.EnumMaintenanceConditionFieldUpdateOperationsInput | $Enums.MaintenanceCondition;
    actionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MaintenanceLogCreateManyExtinguisherInput = {
    id?: string;
    inspectorId: string;
    inspectionId?: string | null;
    actionsTaken: string;
    conditionNoted: $Enums.MaintenanceCondition;
    actionDate: Date | string;
    createdAt?: Date | string;
};
export type MaintenanceLogUpdateWithoutExtinguisherInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actionsTaken?: Prisma.StringFieldUpdateOperationsInput | string;
    conditionNoted?: Prisma.EnumMaintenanceConditionFieldUpdateOperationsInput | $Enums.MaintenanceCondition;
    actionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    inspector?: Prisma.UserUpdateOneRequiredWithoutMaintenanceLogsNestedInput;
    inspection?: Prisma.InspectionUpdateOneWithoutMaintenanceLogsNestedInput;
};
export type MaintenanceLogUncheckedUpdateWithoutExtinguisherInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectorId?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    actionsTaken?: Prisma.StringFieldUpdateOperationsInput | string;
    conditionNoted?: Prisma.EnumMaintenanceConditionFieldUpdateOperationsInput | $Enums.MaintenanceCondition;
    actionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MaintenanceLogUncheckedUpdateManyWithoutExtinguisherInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectorId?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    actionsTaken?: Prisma.StringFieldUpdateOperationsInput | string;
    conditionNoted?: Prisma.EnumMaintenanceConditionFieldUpdateOperationsInput | $Enums.MaintenanceCondition;
    actionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MaintenanceLogCreateManyInspectionInput = {
    id?: string;
    extinguisherId: string;
    inspectorId: string;
    actionsTaken: string;
    conditionNoted: $Enums.MaintenanceCondition;
    actionDate: Date | string;
    createdAt?: Date | string;
};
export type MaintenanceLogUpdateWithoutInspectionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actionsTaken?: Prisma.StringFieldUpdateOperationsInput | string;
    conditionNoted?: Prisma.EnumMaintenanceConditionFieldUpdateOperationsInput | $Enums.MaintenanceCondition;
    actionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    extinguisher?: Prisma.FireExtinguisherUpdateOneRequiredWithoutMaintenanceLogsNestedInput;
    inspector?: Prisma.UserUpdateOneRequiredWithoutMaintenanceLogsNestedInput;
};
export type MaintenanceLogUncheckedUpdateWithoutInspectionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    extinguisherId?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectorId?: Prisma.StringFieldUpdateOperationsInput | string;
    actionsTaken?: Prisma.StringFieldUpdateOperationsInput | string;
    conditionNoted?: Prisma.EnumMaintenanceConditionFieldUpdateOperationsInput | $Enums.MaintenanceCondition;
    actionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MaintenanceLogUncheckedUpdateManyWithoutInspectionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    extinguisherId?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectorId?: Prisma.StringFieldUpdateOperationsInput | string;
    actionsTaken?: Prisma.StringFieldUpdateOperationsInput | string;
    conditionNoted?: Prisma.EnumMaintenanceConditionFieldUpdateOperationsInput | $Enums.MaintenanceCondition;
    actionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MaintenanceLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    extinguisherId?: boolean;
    inspectorId?: boolean;
    inspectionId?: boolean;
    actionsTaken?: boolean;
    conditionNoted?: boolean;
    actionDate?: boolean;
    createdAt?: boolean;
    extinguisher?: boolean | Prisma.FireExtinguisherDefaultArgs<ExtArgs>;
    inspector?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    inspection?: boolean | Prisma.MaintenanceLog$inspectionArgs<ExtArgs>;
}, ExtArgs["result"]["maintenanceLog"]>;
export type MaintenanceLogSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    extinguisherId?: boolean;
    inspectorId?: boolean;
    inspectionId?: boolean;
    actionsTaken?: boolean;
    conditionNoted?: boolean;
    actionDate?: boolean;
    createdAt?: boolean;
    extinguisher?: boolean | Prisma.FireExtinguisherDefaultArgs<ExtArgs>;
    inspector?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    inspection?: boolean | Prisma.MaintenanceLog$inspectionArgs<ExtArgs>;
}, ExtArgs["result"]["maintenanceLog"]>;
export type MaintenanceLogSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    extinguisherId?: boolean;
    inspectorId?: boolean;
    inspectionId?: boolean;
    actionsTaken?: boolean;
    conditionNoted?: boolean;
    actionDate?: boolean;
    createdAt?: boolean;
    extinguisher?: boolean | Prisma.FireExtinguisherDefaultArgs<ExtArgs>;
    inspector?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    inspection?: boolean | Prisma.MaintenanceLog$inspectionArgs<ExtArgs>;
}, ExtArgs["result"]["maintenanceLog"]>;
export type MaintenanceLogSelectScalar = {
    id?: boolean;
    extinguisherId?: boolean;
    inspectorId?: boolean;
    inspectionId?: boolean;
    actionsTaken?: boolean;
    conditionNoted?: boolean;
    actionDate?: boolean;
    createdAt?: boolean;
};
export type MaintenanceLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "extinguisherId" | "inspectorId" | "inspectionId" | "actionsTaken" | "conditionNoted" | "actionDate" | "createdAt", ExtArgs["result"]["maintenanceLog"]>;
export type MaintenanceLogInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    extinguisher?: boolean | Prisma.FireExtinguisherDefaultArgs<ExtArgs>;
    inspector?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    inspection?: boolean | Prisma.MaintenanceLog$inspectionArgs<ExtArgs>;
};
export type MaintenanceLogIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    extinguisher?: boolean | Prisma.FireExtinguisherDefaultArgs<ExtArgs>;
    inspector?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    inspection?: boolean | Prisma.MaintenanceLog$inspectionArgs<ExtArgs>;
};
export type MaintenanceLogIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    extinguisher?: boolean | Prisma.FireExtinguisherDefaultArgs<ExtArgs>;
    inspector?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    inspection?: boolean | Prisma.MaintenanceLog$inspectionArgs<ExtArgs>;
};
export type $MaintenanceLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MaintenanceLog";
    objects: {
        extinguisher: Prisma.$FireExtinguisherPayload<ExtArgs>;
        inspector: Prisma.$UserPayload<ExtArgs>;
        inspection: Prisma.$InspectionPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        extinguisherId: string;
        inspectorId: string;
        inspectionId: string | null;
        actionsTaken: string;
        conditionNoted: $Enums.MaintenanceCondition;
        actionDate: Date;
        createdAt: Date;
    }, ExtArgs["result"]["maintenanceLog"]>;
    composites: {};
};
export type MaintenanceLogGetPayload<S extends boolean | null | undefined | MaintenanceLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MaintenanceLogPayload, S>;
export type MaintenanceLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MaintenanceLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MaintenanceLogCountAggregateInputType | true;
};
export interface MaintenanceLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MaintenanceLog'];
        meta: {
            name: 'MaintenanceLog';
        };
    };
    findUnique<T extends MaintenanceLogFindUniqueArgs>(args: Prisma.SelectSubset<T, MaintenanceLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MaintenanceLogClient<runtime.Types.Result.GetResult<Prisma.$MaintenanceLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends MaintenanceLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MaintenanceLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MaintenanceLogClient<runtime.Types.Result.GetResult<Prisma.$MaintenanceLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends MaintenanceLogFindFirstArgs>(args?: Prisma.SelectSubset<T, MaintenanceLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__MaintenanceLogClient<runtime.Types.Result.GetResult<Prisma.$MaintenanceLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends MaintenanceLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MaintenanceLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MaintenanceLogClient<runtime.Types.Result.GetResult<Prisma.$MaintenanceLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends MaintenanceLogFindManyArgs>(args?: Prisma.SelectSubset<T, MaintenanceLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaintenanceLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends MaintenanceLogCreateArgs>(args: Prisma.SelectSubset<T, MaintenanceLogCreateArgs<ExtArgs>>): Prisma.Prisma__MaintenanceLogClient<runtime.Types.Result.GetResult<Prisma.$MaintenanceLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends MaintenanceLogCreateManyArgs>(args?: Prisma.SelectSubset<T, MaintenanceLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends MaintenanceLogCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MaintenanceLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaintenanceLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends MaintenanceLogDeleteArgs>(args: Prisma.SelectSubset<T, MaintenanceLogDeleteArgs<ExtArgs>>): Prisma.Prisma__MaintenanceLogClient<runtime.Types.Result.GetResult<Prisma.$MaintenanceLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends MaintenanceLogUpdateArgs>(args: Prisma.SelectSubset<T, MaintenanceLogUpdateArgs<ExtArgs>>): Prisma.Prisma__MaintenanceLogClient<runtime.Types.Result.GetResult<Prisma.$MaintenanceLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends MaintenanceLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, MaintenanceLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends MaintenanceLogUpdateManyArgs>(args: Prisma.SelectSubset<T, MaintenanceLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends MaintenanceLogUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MaintenanceLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaintenanceLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends MaintenanceLogUpsertArgs>(args: Prisma.SelectSubset<T, MaintenanceLogUpsertArgs<ExtArgs>>): Prisma.Prisma__MaintenanceLogClient<runtime.Types.Result.GetResult<Prisma.$MaintenanceLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends MaintenanceLogCountArgs>(args?: Prisma.Subset<T, MaintenanceLogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MaintenanceLogCountAggregateOutputType> : number>;
    aggregate<T extends MaintenanceLogAggregateArgs>(args: Prisma.Subset<T, MaintenanceLogAggregateArgs>): Prisma.PrismaPromise<GetMaintenanceLogAggregateType<T>>;
    groupBy<T extends MaintenanceLogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MaintenanceLogGroupByArgs['orderBy'];
    } : {
        orderBy?: MaintenanceLogGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MaintenanceLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMaintenanceLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: MaintenanceLogFieldRefs;
}
export interface Prisma__MaintenanceLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    extinguisher<T extends Prisma.FireExtinguisherDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FireExtinguisherDefaultArgs<ExtArgs>>): Prisma.Prisma__FireExtinguisherClient<runtime.Types.Result.GetResult<Prisma.$FireExtinguisherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    inspector<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    inspection<T extends Prisma.MaintenanceLog$inspectionArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaintenanceLog$inspectionArgs<ExtArgs>>): Prisma.Prisma__InspectionClient<runtime.Types.Result.GetResult<Prisma.$InspectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface MaintenanceLogFieldRefs {
    readonly id: Prisma.FieldRef<"MaintenanceLog", 'String'>;
    readonly extinguisherId: Prisma.FieldRef<"MaintenanceLog", 'String'>;
    readonly inspectorId: Prisma.FieldRef<"MaintenanceLog", 'String'>;
    readonly inspectionId: Prisma.FieldRef<"MaintenanceLog", 'String'>;
    readonly actionsTaken: Prisma.FieldRef<"MaintenanceLog", 'String'>;
    readonly conditionNoted: Prisma.FieldRef<"MaintenanceLog", 'MaintenanceCondition'>;
    readonly actionDate: Prisma.FieldRef<"MaintenanceLog", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"MaintenanceLog", 'DateTime'>;
}
export type MaintenanceLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaintenanceLogSelect<ExtArgs> | null;
    omit?: Prisma.MaintenanceLogOmit<ExtArgs> | null;
    include?: Prisma.MaintenanceLogInclude<ExtArgs> | null;
    where: Prisma.MaintenanceLogWhereUniqueInput;
};
export type MaintenanceLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaintenanceLogSelect<ExtArgs> | null;
    omit?: Prisma.MaintenanceLogOmit<ExtArgs> | null;
    include?: Prisma.MaintenanceLogInclude<ExtArgs> | null;
    where: Prisma.MaintenanceLogWhereUniqueInput;
};
export type MaintenanceLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MaintenanceLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MaintenanceLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MaintenanceLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaintenanceLogSelect<ExtArgs> | null;
    omit?: Prisma.MaintenanceLogOmit<ExtArgs> | null;
    include?: Prisma.MaintenanceLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MaintenanceLogCreateInput, Prisma.MaintenanceLogUncheckedCreateInput>;
};
export type MaintenanceLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.MaintenanceLogCreateManyInput | Prisma.MaintenanceLogCreateManyInput[];
    skipDuplicates?: boolean;
};
export type MaintenanceLogCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaintenanceLogSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MaintenanceLogOmit<ExtArgs> | null;
    data: Prisma.MaintenanceLogCreateManyInput | Prisma.MaintenanceLogCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.MaintenanceLogIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type MaintenanceLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaintenanceLogSelect<ExtArgs> | null;
    omit?: Prisma.MaintenanceLogOmit<ExtArgs> | null;
    include?: Prisma.MaintenanceLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MaintenanceLogUpdateInput, Prisma.MaintenanceLogUncheckedUpdateInput>;
    where: Prisma.MaintenanceLogWhereUniqueInput;
};
export type MaintenanceLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.MaintenanceLogUpdateManyMutationInput, Prisma.MaintenanceLogUncheckedUpdateManyInput>;
    where?: Prisma.MaintenanceLogWhereInput;
    limit?: number;
};
export type MaintenanceLogUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaintenanceLogSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MaintenanceLogOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MaintenanceLogUpdateManyMutationInput, Prisma.MaintenanceLogUncheckedUpdateManyInput>;
    where?: Prisma.MaintenanceLogWhereInput;
    limit?: number;
    include?: Prisma.MaintenanceLogIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type MaintenanceLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaintenanceLogSelect<ExtArgs> | null;
    omit?: Prisma.MaintenanceLogOmit<ExtArgs> | null;
    include?: Prisma.MaintenanceLogInclude<ExtArgs> | null;
    where: Prisma.MaintenanceLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaintenanceLogCreateInput, Prisma.MaintenanceLogUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.MaintenanceLogUpdateInput, Prisma.MaintenanceLogUncheckedUpdateInput>;
};
export type MaintenanceLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaintenanceLogSelect<ExtArgs> | null;
    omit?: Prisma.MaintenanceLogOmit<ExtArgs> | null;
    include?: Prisma.MaintenanceLogInclude<ExtArgs> | null;
    where: Prisma.MaintenanceLogWhereUniqueInput;
};
export type MaintenanceLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaintenanceLogWhereInput;
    limit?: number;
};
export type MaintenanceLog$inspectionArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectionSelect<ExtArgs> | null;
    omit?: Prisma.InspectionOmit<ExtArgs> | null;
    include?: Prisma.InspectionInclude<ExtArgs> | null;
    where?: Prisma.InspectionWhereInput;
};
export type MaintenanceLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaintenanceLogSelect<ExtArgs> | null;
    omit?: Prisma.MaintenanceLogOmit<ExtArgs> | null;
    include?: Prisma.MaintenanceLogInclude<ExtArgs> | null;
};
