import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type FireExtinguisherModel = runtime.Types.Result.DefaultSelection<Prisma.$FireExtinguisherPayload>;
export type AggregateFireExtinguisher = {
    _count: FireExtinguisherCountAggregateOutputType | null;
    _min: FireExtinguisherMinAggregateOutputType | null;
    _max: FireExtinguisherMaxAggregateOutputType | null;
};
export type FireExtinguisherMinAggregateOutputType = {
    id: string | null;
    serialNumber: string | null;
    location: string | null;
    type: $Enums.ExtinguisherType | null;
    size: string | null;
    installationDate: Date | null;
    expiryDate: Date | null;
    status: $Enums.ExtinguisherStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FireExtinguisherMaxAggregateOutputType = {
    id: string | null;
    serialNumber: string | null;
    location: string | null;
    type: $Enums.ExtinguisherType | null;
    size: string | null;
    installationDate: Date | null;
    expiryDate: Date | null;
    status: $Enums.ExtinguisherStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FireExtinguisherCountAggregateOutputType = {
    id: number;
    serialNumber: number;
    location: number;
    type: number;
    size: number;
    installationDate: number;
    expiryDate: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type FireExtinguisherMinAggregateInputType = {
    id?: true;
    serialNumber?: true;
    location?: true;
    type?: true;
    size?: true;
    installationDate?: true;
    expiryDate?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FireExtinguisherMaxAggregateInputType = {
    id?: true;
    serialNumber?: true;
    location?: true;
    type?: true;
    size?: true;
    installationDate?: true;
    expiryDate?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FireExtinguisherCountAggregateInputType = {
    id?: true;
    serialNumber?: true;
    location?: true;
    type?: true;
    size?: true;
    installationDate?: true;
    expiryDate?: true;
    status?: true;
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
    location: string;
    type: $Enums.ExtinguisherType;
    size: string;
    installationDate: Date;
    expiryDate: Date;
    status: $Enums.ExtinguisherStatus;
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
    location?: Prisma.StringFilter<"FireExtinguisher"> | string;
    type?: Prisma.EnumExtinguisherTypeFilter<"FireExtinguisher"> | $Enums.ExtinguisherType;
    size?: Prisma.StringFilter<"FireExtinguisher"> | string;
    installationDate?: Prisma.DateTimeFilter<"FireExtinguisher"> | Date | string;
    expiryDate?: Prisma.DateTimeFilter<"FireExtinguisher"> | Date | string;
    status?: Prisma.EnumExtinguisherStatusFilter<"FireExtinguisher"> | $Enums.ExtinguisherStatus;
    createdAt?: Prisma.DateTimeFilter<"FireExtinguisher"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"FireExtinguisher"> | Date | string;
    inspections?: Prisma.InspectionListRelationFilter;
    maintenanceLogs?: Prisma.MaintenanceLogListRelationFilter;
    notifications?: Prisma.NotificationListRelationFilter;
};
export type FireExtinguisherOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    serialNumber?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    size?: Prisma.SortOrder;
    installationDate?: Prisma.SortOrder;
    expiryDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    inspections?: Prisma.InspectionOrderByRelationAggregateInput;
    maintenanceLogs?: Prisma.MaintenanceLogOrderByRelationAggregateInput;
    notifications?: Prisma.NotificationOrderByRelationAggregateInput;
};
export type FireExtinguisherWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    serialNumber?: string;
    AND?: Prisma.FireExtinguisherWhereInput | Prisma.FireExtinguisherWhereInput[];
    OR?: Prisma.FireExtinguisherWhereInput[];
    NOT?: Prisma.FireExtinguisherWhereInput | Prisma.FireExtinguisherWhereInput[];
    location?: Prisma.StringFilter<"FireExtinguisher"> | string;
    type?: Prisma.EnumExtinguisherTypeFilter<"FireExtinguisher"> | $Enums.ExtinguisherType;
    size?: Prisma.StringFilter<"FireExtinguisher"> | string;
    installationDate?: Prisma.DateTimeFilter<"FireExtinguisher"> | Date | string;
    expiryDate?: Prisma.DateTimeFilter<"FireExtinguisher"> | Date | string;
    status?: Prisma.EnumExtinguisherStatusFilter<"FireExtinguisher"> | $Enums.ExtinguisherStatus;
    createdAt?: Prisma.DateTimeFilter<"FireExtinguisher"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"FireExtinguisher"> | Date | string;
    inspections?: Prisma.InspectionListRelationFilter;
    maintenanceLogs?: Prisma.MaintenanceLogListRelationFilter;
    notifications?: Prisma.NotificationListRelationFilter;
}, "id" | "serialNumber">;
export type FireExtinguisherOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    serialNumber?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    size?: Prisma.SortOrder;
    installationDate?: Prisma.SortOrder;
    expiryDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
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
    location?: Prisma.StringWithAggregatesFilter<"FireExtinguisher"> | string;
    type?: Prisma.EnumExtinguisherTypeWithAggregatesFilter<"FireExtinguisher"> | $Enums.ExtinguisherType;
    size?: Prisma.StringWithAggregatesFilter<"FireExtinguisher"> | string;
    installationDate?: Prisma.DateTimeWithAggregatesFilter<"FireExtinguisher"> | Date | string;
    expiryDate?: Prisma.DateTimeWithAggregatesFilter<"FireExtinguisher"> | Date | string;
    status?: Prisma.EnumExtinguisherStatusWithAggregatesFilter<"FireExtinguisher"> | $Enums.ExtinguisherStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"FireExtinguisher"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"FireExtinguisher"> | Date | string;
};
export type FireExtinguisherCreateInput = {
    id?: string;
    serialNumber: string;
    location: string;
    type: $Enums.ExtinguisherType;
    size: string;
    installationDate: Date | string;
    expiryDate: Date | string;
    status?: $Enums.ExtinguisherStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    inspections?: Prisma.InspectionCreateNestedManyWithoutExtinguisherInput;
    maintenanceLogs?: Prisma.MaintenanceLogCreateNestedManyWithoutExtinguisherInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutExtinguisherInput;
};
export type FireExtinguisherUncheckedCreateInput = {
    id?: string;
    serialNumber: string;
    location: string;
    type: $Enums.ExtinguisherType;
    size: string;
    installationDate: Date | string;
    expiryDate: Date | string;
    status?: $Enums.ExtinguisherStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    inspections?: Prisma.InspectionUncheckedCreateNestedManyWithoutExtinguisherInput;
    maintenanceLogs?: Prisma.MaintenanceLogUncheckedCreateNestedManyWithoutExtinguisherInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutExtinguisherInput;
};
export type FireExtinguisherUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    serialNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumExtinguisherTypeFieldUpdateOperationsInput | $Enums.ExtinguisherType;
    size?: Prisma.StringFieldUpdateOperationsInput | string;
    installationDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumExtinguisherStatusFieldUpdateOperationsInput | $Enums.ExtinguisherStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    inspections?: Prisma.InspectionUpdateManyWithoutExtinguisherNestedInput;
    maintenanceLogs?: Prisma.MaintenanceLogUpdateManyWithoutExtinguisherNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutExtinguisherNestedInput;
};
export type FireExtinguisherUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    serialNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumExtinguisherTypeFieldUpdateOperationsInput | $Enums.ExtinguisherType;
    size?: Prisma.StringFieldUpdateOperationsInput | string;
    installationDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumExtinguisherStatusFieldUpdateOperationsInput | $Enums.ExtinguisherStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    inspections?: Prisma.InspectionUncheckedUpdateManyWithoutExtinguisherNestedInput;
    maintenanceLogs?: Prisma.MaintenanceLogUncheckedUpdateManyWithoutExtinguisherNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutExtinguisherNestedInput;
};
export type FireExtinguisherCreateManyInput = {
    id?: string;
    serialNumber: string;
    location: string;
    type: $Enums.ExtinguisherType;
    size: string;
    installationDate: Date | string;
    expiryDate: Date | string;
    status?: $Enums.ExtinguisherStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FireExtinguisherUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    serialNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumExtinguisherTypeFieldUpdateOperationsInput | $Enums.ExtinguisherType;
    size?: Prisma.StringFieldUpdateOperationsInput | string;
    installationDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumExtinguisherStatusFieldUpdateOperationsInput | $Enums.ExtinguisherStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FireExtinguisherUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    serialNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumExtinguisherTypeFieldUpdateOperationsInput | $Enums.ExtinguisherType;
    size?: Prisma.StringFieldUpdateOperationsInput | string;
    installationDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumExtinguisherStatusFieldUpdateOperationsInput | $Enums.ExtinguisherStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FireExtinguisherCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    serialNumber?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    size?: Prisma.SortOrder;
    installationDate?: Prisma.SortOrder;
    expiryDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FireExtinguisherMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    serialNumber?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    size?: Prisma.SortOrder;
    installationDate?: Prisma.SortOrder;
    expiryDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FireExtinguisherMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    serialNumber?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    size?: Prisma.SortOrder;
    installationDate?: Prisma.SortOrder;
    expiryDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FireExtinguisherScalarRelationFilter = {
    is?: Prisma.FireExtinguisherWhereInput;
    isNot?: Prisma.FireExtinguisherWhereInput;
};
export type FireExtinguisherNullableScalarRelationFilter = {
    is?: Prisma.FireExtinguisherWhereInput | null;
    isNot?: Prisma.FireExtinguisherWhereInput | null;
};
export type EnumExtinguisherTypeFieldUpdateOperationsInput = {
    set?: $Enums.ExtinguisherType;
};
export type EnumExtinguisherStatusFieldUpdateOperationsInput = {
    set?: $Enums.ExtinguisherStatus;
};
export type FireExtinguisherCreateNestedOneWithoutInspectionsInput = {
    create?: Prisma.XOR<Prisma.FireExtinguisherCreateWithoutInspectionsInput, Prisma.FireExtinguisherUncheckedCreateWithoutInspectionsInput>;
    connectOrCreate?: Prisma.FireExtinguisherCreateOrConnectWithoutInspectionsInput;
    connect?: Prisma.FireExtinguisherWhereUniqueInput;
};
export type FireExtinguisherUpdateOneRequiredWithoutInspectionsNestedInput = {
    create?: Prisma.XOR<Prisma.FireExtinguisherCreateWithoutInspectionsInput, Prisma.FireExtinguisherUncheckedCreateWithoutInspectionsInput>;
    connectOrCreate?: Prisma.FireExtinguisherCreateOrConnectWithoutInspectionsInput;
    upsert?: Prisma.FireExtinguisherUpsertWithoutInspectionsInput;
    connect?: Prisma.FireExtinguisherWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FireExtinguisherUpdateToOneWithWhereWithoutInspectionsInput, Prisma.FireExtinguisherUpdateWithoutInspectionsInput>, Prisma.FireExtinguisherUncheckedUpdateWithoutInspectionsInput>;
};
export type FireExtinguisherCreateNestedOneWithoutMaintenanceLogsInput = {
    create?: Prisma.XOR<Prisma.FireExtinguisherCreateWithoutMaintenanceLogsInput, Prisma.FireExtinguisherUncheckedCreateWithoutMaintenanceLogsInput>;
    connectOrCreate?: Prisma.FireExtinguisherCreateOrConnectWithoutMaintenanceLogsInput;
    connect?: Prisma.FireExtinguisherWhereUniqueInput;
};
export type FireExtinguisherUpdateOneRequiredWithoutMaintenanceLogsNestedInput = {
    create?: Prisma.XOR<Prisma.FireExtinguisherCreateWithoutMaintenanceLogsInput, Prisma.FireExtinguisherUncheckedCreateWithoutMaintenanceLogsInput>;
    connectOrCreate?: Prisma.FireExtinguisherCreateOrConnectWithoutMaintenanceLogsInput;
    upsert?: Prisma.FireExtinguisherUpsertWithoutMaintenanceLogsInput;
    connect?: Prisma.FireExtinguisherWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FireExtinguisherUpdateToOneWithWhereWithoutMaintenanceLogsInput, Prisma.FireExtinguisherUpdateWithoutMaintenanceLogsInput>, Prisma.FireExtinguisherUncheckedUpdateWithoutMaintenanceLogsInput>;
};
export type FireExtinguisherCreateNestedOneWithoutNotificationsInput = {
    create?: Prisma.XOR<Prisma.FireExtinguisherCreateWithoutNotificationsInput, Prisma.FireExtinguisherUncheckedCreateWithoutNotificationsInput>;
    connectOrCreate?: Prisma.FireExtinguisherCreateOrConnectWithoutNotificationsInput;
    connect?: Prisma.FireExtinguisherWhereUniqueInput;
};
export type FireExtinguisherUpdateOneWithoutNotificationsNestedInput = {
    create?: Prisma.XOR<Prisma.FireExtinguisherCreateWithoutNotificationsInput, Prisma.FireExtinguisherUncheckedCreateWithoutNotificationsInput>;
    connectOrCreate?: Prisma.FireExtinguisherCreateOrConnectWithoutNotificationsInput;
    upsert?: Prisma.FireExtinguisherUpsertWithoutNotificationsInput;
    disconnect?: Prisma.FireExtinguisherWhereInput | boolean;
    delete?: Prisma.FireExtinguisherWhereInput | boolean;
    connect?: Prisma.FireExtinguisherWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FireExtinguisherUpdateToOneWithWhereWithoutNotificationsInput, Prisma.FireExtinguisherUpdateWithoutNotificationsInput>, Prisma.FireExtinguisherUncheckedUpdateWithoutNotificationsInput>;
};
export type FireExtinguisherCreateWithoutInspectionsInput = {
    id?: string;
    serialNumber: string;
    location: string;
    type: $Enums.ExtinguisherType;
    size: string;
    installationDate: Date | string;
    expiryDate: Date | string;
    status?: $Enums.ExtinguisherStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceLogs?: Prisma.MaintenanceLogCreateNestedManyWithoutExtinguisherInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutExtinguisherInput;
};
export type FireExtinguisherUncheckedCreateWithoutInspectionsInput = {
    id?: string;
    serialNumber: string;
    location: string;
    type: $Enums.ExtinguisherType;
    size: string;
    installationDate: Date | string;
    expiryDate: Date | string;
    status?: $Enums.ExtinguisherStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceLogs?: Prisma.MaintenanceLogUncheckedCreateNestedManyWithoutExtinguisherInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutExtinguisherInput;
};
export type FireExtinguisherCreateOrConnectWithoutInspectionsInput = {
    where: Prisma.FireExtinguisherWhereUniqueInput;
    create: Prisma.XOR<Prisma.FireExtinguisherCreateWithoutInspectionsInput, Prisma.FireExtinguisherUncheckedCreateWithoutInspectionsInput>;
};
export type FireExtinguisherUpsertWithoutInspectionsInput = {
    update: Prisma.XOR<Prisma.FireExtinguisherUpdateWithoutInspectionsInput, Prisma.FireExtinguisherUncheckedUpdateWithoutInspectionsInput>;
    create: Prisma.XOR<Prisma.FireExtinguisherCreateWithoutInspectionsInput, Prisma.FireExtinguisherUncheckedCreateWithoutInspectionsInput>;
    where?: Prisma.FireExtinguisherWhereInput;
};
export type FireExtinguisherUpdateToOneWithWhereWithoutInspectionsInput = {
    where?: Prisma.FireExtinguisherWhereInput;
    data: Prisma.XOR<Prisma.FireExtinguisherUpdateWithoutInspectionsInput, Prisma.FireExtinguisherUncheckedUpdateWithoutInspectionsInput>;
};
export type FireExtinguisherUpdateWithoutInspectionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    serialNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumExtinguisherTypeFieldUpdateOperationsInput | $Enums.ExtinguisherType;
    size?: Prisma.StringFieldUpdateOperationsInput | string;
    installationDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumExtinguisherStatusFieldUpdateOperationsInput | $Enums.ExtinguisherStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceLogs?: Prisma.MaintenanceLogUpdateManyWithoutExtinguisherNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutExtinguisherNestedInput;
};
export type FireExtinguisherUncheckedUpdateWithoutInspectionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    serialNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumExtinguisherTypeFieldUpdateOperationsInput | $Enums.ExtinguisherType;
    size?: Prisma.StringFieldUpdateOperationsInput | string;
    installationDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumExtinguisherStatusFieldUpdateOperationsInput | $Enums.ExtinguisherStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceLogs?: Prisma.MaintenanceLogUncheckedUpdateManyWithoutExtinguisherNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutExtinguisherNestedInput;
};
export type FireExtinguisherCreateWithoutMaintenanceLogsInput = {
    id?: string;
    serialNumber: string;
    location: string;
    type: $Enums.ExtinguisherType;
    size: string;
    installationDate: Date | string;
    expiryDate: Date | string;
    status?: $Enums.ExtinguisherStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    inspections?: Prisma.InspectionCreateNestedManyWithoutExtinguisherInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutExtinguisherInput;
};
export type FireExtinguisherUncheckedCreateWithoutMaintenanceLogsInput = {
    id?: string;
    serialNumber: string;
    location: string;
    type: $Enums.ExtinguisherType;
    size: string;
    installationDate: Date | string;
    expiryDate: Date | string;
    status?: $Enums.ExtinguisherStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    inspections?: Prisma.InspectionUncheckedCreateNestedManyWithoutExtinguisherInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutExtinguisherInput;
};
export type FireExtinguisherCreateOrConnectWithoutMaintenanceLogsInput = {
    where: Prisma.FireExtinguisherWhereUniqueInput;
    create: Prisma.XOR<Prisma.FireExtinguisherCreateWithoutMaintenanceLogsInput, Prisma.FireExtinguisherUncheckedCreateWithoutMaintenanceLogsInput>;
};
export type FireExtinguisherUpsertWithoutMaintenanceLogsInput = {
    update: Prisma.XOR<Prisma.FireExtinguisherUpdateWithoutMaintenanceLogsInput, Prisma.FireExtinguisherUncheckedUpdateWithoutMaintenanceLogsInput>;
    create: Prisma.XOR<Prisma.FireExtinguisherCreateWithoutMaintenanceLogsInput, Prisma.FireExtinguisherUncheckedCreateWithoutMaintenanceLogsInput>;
    where?: Prisma.FireExtinguisherWhereInput;
};
export type FireExtinguisherUpdateToOneWithWhereWithoutMaintenanceLogsInput = {
    where?: Prisma.FireExtinguisherWhereInput;
    data: Prisma.XOR<Prisma.FireExtinguisherUpdateWithoutMaintenanceLogsInput, Prisma.FireExtinguisherUncheckedUpdateWithoutMaintenanceLogsInput>;
};
export type FireExtinguisherUpdateWithoutMaintenanceLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    serialNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumExtinguisherTypeFieldUpdateOperationsInput | $Enums.ExtinguisherType;
    size?: Prisma.StringFieldUpdateOperationsInput | string;
    installationDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumExtinguisherStatusFieldUpdateOperationsInput | $Enums.ExtinguisherStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    inspections?: Prisma.InspectionUpdateManyWithoutExtinguisherNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutExtinguisherNestedInput;
};
export type FireExtinguisherUncheckedUpdateWithoutMaintenanceLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    serialNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumExtinguisherTypeFieldUpdateOperationsInput | $Enums.ExtinguisherType;
    size?: Prisma.StringFieldUpdateOperationsInput | string;
    installationDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumExtinguisherStatusFieldUpdateOperationsInput | $Enums.ExtinguisherStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    inspections?: Prisma.InspectionUncheckedUpdateManyWithoutExtinguisherNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutExtinguisherNestedInput;
};
export type FireExtinguisherCreateWithoutNotificationsInput = {
    id?: string;
    serialNumber: string;
    location: string;
    type: $Enums.ExtinguisherType;
    size: string;
    installationDate: Date | string;
    expiryDate: Date | string;
    status?: $Enums.ExtinguisherStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    inspections?: Prisma.InspectionCreateNestedManyWithoutExtinguisherInput;
    maintenanceLogs?: Prisma.MaintenanceLogCreateNestedManyWithoutExtinguisherInput;
};
export type FireExtinguisherUncheckedCreateWithoutNotificationsInput = {
    id?: string;
    serialNumber: string;
    location: string;
    type: $Enums.ExtinguisherType;
    size: string;
    installationDate: Date | string;
    expiryDate: Date | string;
    status?: $Enums.ExtinguisherStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    inspections?: Prisma.InspectionUncheckedCreateNestedManyWithoutExtinguisherInput;
    maintenanceLogs?: Prisma.MaintenanceLogUncheckedCreateNestedManyWithoutExtinguisherInput;
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
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumExtinguisherTypeFieldUpdateOperationsInput | $Enums.ExtinguisherType;
    size?: Prisma.StringFieldUpdateOperationsInput | string;
    installationDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumExtinguisherStatusFieldUpdateOperationsInput | $Enums.ExtinguisherStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    inspections?: Prisma.InspectionUpdateManyWithoutExtinguisherNestedInput;
    maintenanceLogs?: Prisma.MaintenanceLogUpdateManyWithoutExtinguisherNestedInput;
};
export type FireExtinguisherUncheckedUpdateWithoutNotificationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    serialNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumExtinguisherTypeFieldUpdateOperationsInput | $Enums.ExtinguisherType;
    size?: Prisma.StringFieldUpdateOperationsInput | string;
    installationDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumExtinguisherStatusFieldUpdateOperationsInput | $Enums.ExtinguisherStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    inspections?: Prisma.InspectionUncheckedUpdateManyWithoutExtinguisherNestedInput;
    maintenanceLogs?: Prisma.MaintenanceLogUncheckedUpdateManyWithoutExtinguisherNestedInput;
};
export type FireExtinguisherCountOutputType = {
    inspections: number;
    maintenanceLogs: number;
    notifications: number;
};
export type FireExtinguisherCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    inspections?: boolean | FireExtinguisherCountOutputTypeCountInspectionsArgs;
    maintenanceLogs?: boolean | FireExtinguisherCountOutputTypeCountMaintenanceLogsArgs;
    notifications?: boolean | FireExtinguisherCountOutputTypeCountNotificationsArgs;
};
export type FireExtinguisherCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FireExtinguisherCountOutputTypeSelect<ExtArgs> | null;
};
export type FireExtinguisherCountOutputTypeCountInspectionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InspectionWhereInput;
};
export type FireExtinguisherCountOutputTypeCountMaintenanceLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaintenanceLogWhereInput;
};
export type FireExtinguisherCountOutputTypeCountNotificationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationWhereInput;
};
export type FireExtinguisherSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    serialNumber?: boolean;
    location?: boolean;
    type?: boolean;
    size?: boolean;
    installationDate?: boolean;
    expiryDate?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    inspections?: boolean | Prisma.FireExtinguisher$inspectionsArgs<ExtArgs>;
    maintenanceLogs?: boolean | Prisma.FireExtinguisher$maintenanceLogsArgs<ExtArgs>;
    notifications?: boolean | Prisma.FireExtinguisher$notificationsArgs<ExtArgs>;
    _count?: boolean | Prisma.FireExtinguisherCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["fireExtinguisher"]>;
export type FireExtinguisherSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    serialNumber?: boolean;
    location?: boolean;
    type?: boolean;
    size?: boolean;
    installationDate?: boolean;
    expiryDate?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["fireExtinguisher"]>;
export type FireExtinguisherSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    serialNumber?: boolean;
    location?: boolean;
    type?: boolean;
    size?: boolean;
    installationDate?: boolean;
    expiryDate?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["fireExtinguisher"]>;
export type FireExtinguisherSelectScalar = {
    id?: boolean;
    serialNumber?: boolean;
    location?: boolean;
    type?: boolean;
    size?: boolean;
    installationDate?: boolean;
    expiryDate?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type FireExtinguisherOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "serialNumber" | "location" | "type" | "size" | "installationDate" | "expiryDate" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["fireExtinguisher"]>;
export type FireExtinguisherInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    inspections?: boolean | Prisma.FireExtinguisher$inspectionsArgs<ExtArgs>;
    maintenanceLogs?: boolean | Prisma.FireExtinguisher$maintenanceLogsArgs<ExtArgs>;
    notifications?: boolean | Prisma.FireExtinguisher$notificationsArgs<ExtArgs>;
    _count?: boolean | Prisma.FireExtinguisherCountOutputTypeDefaultArgs<ExtArgs>;
};
export type FireExtinguisherIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type FireExtinguisherIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $FireExtinguisherPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "FireExtinguisher";
    objects: {
        inspections: Prisma.$InspectionPayload<ExtArgs>[];
        maintenanceLogs: Prisma.$MaintenanceLogPayload<ExtArgs>[];
        notifications: Prisma.$NotificationPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        serialNumber: string;
        location: string;
        type: $Enums.ExtinguisherType;
        size: string;
        installationDate: Date;
        expiryDate: Date;
        status: $Enums.ExtinguisherStatus;
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
    inspections<T extends Prisma.FireExtinguisher$inspectionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FireExtinguisher$inspectionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InspectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    maintenanceLogs<T extends Prisma.FireExtinguisher$maintenanceLogsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FireExtinguisher$maintenanceLogsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaintenanceLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    notifications<T extends Prisma.FireExtinguisher$notificationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FireExtinguisher$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface FireExtinguisherFieldRefs {
    readonly id: Prisma.FieldRef<"FireExtinguisher", 'String'>;
    readonly serialNumber: Prisma.FieldRef<"FireExtinguisher", 'String'>;
    readonly location: Prisma.FieldRef<"FireExtinguisher", 'String'>;
    readonly type: Prisma.FieldRef<"FireExtinguisher", 'ExtinguisherType'>;
    readonly size: Prisma.FieldRef<"FireExtinguisher", 'String'>;
    readonly installationDate: Prisma.FieldRef<"FireExtinguisher", 'DateTime'>;
    readonly expiryDate: Prisma.FieldRef<"FireExtinguisher", 'DateTime'>;
    readonly status: Prisma.FieldRef<"FireExtinguisher", 'ExtinguisherStatus'>;
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
export type FireExtinguisher$inspectionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FireExtinguisher$maintenanceLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FireExtinguisherDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FireExtinguisherSelect<ExtArgs> | null;
    omit?: Prisma.FireExtinguisherOmit<ExtArgs> | null;
    include?: Prisma.FireExtinguisherInclude<ExtArgs> | null;
};
