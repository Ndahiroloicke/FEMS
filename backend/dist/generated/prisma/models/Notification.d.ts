import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type NotificationModel = runtime.Types.Result.DefaultSelection<Prisma.$NotificationPayload>;
export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null;
    _min: NotificationMinAggregateOutputType | null;
    _max: NotificationMaxAggregateOutputType | null;
};
export type NotificationMinAggregateOutputType = {
    id: string | null;
    type: $Enums.NotificationType | null;
    channel: $Enums.NotificationChannel | null;
    message: string | null;
    sentAt: Date | null;
    customerId: string | null;
    extinguisherId: string | null;
};
export type NotificationMaxAggregateOutputType = {
    id: string | null;
    type: $Enums.NotificationType | null;
    channel: $Enums.NotificationChannel | null;
    message: string | null;
    sentAt: Date | null;
    customerId: string | null;
    extinguisherId: string | null;
};
export type NotificationCountAggregateOutputType = {
    id: number;
    type: number;
    channel: number;
    message: number;
    sentAt: number;
    customerId: number;
    extinguisherId: number;
    _all: number;
};
export type NotificationMinAggregateInputType = {
    id?: true;
    type?: true;
    channel?: true;
    message?: true;
    sentAt?: true;
    customerId?: true;
    extinguisherId?: true;
};
export type NotificationMaxAggregateInputType = {
    id?: true;
    type?: true;
    channel?: true;
    message?: true;
    sentAt?: true;
    customerId?: true;
    extinguisherId?: true;
};
export type NotificationCountAggregateInputType = {
    id?: true;
    type?: true;
    channel?: true;
    message?: true;
    sentAt?: true;
    customerId?: true;
    extinguisherId?: true;
    _all?: true;
};
export type NotificationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationWhereInput;
    orderBy?: Prisma.NotificationOrderByWithRelationInput | Prisma.NotificationOrderByWithRelationInput[];
    cursor?: Prisma.NotificationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | NotificationCountAggregateInputType;
    _min?: NotificationMinAggregateInputType;
    _max?: NotificationMaxAggregateInputType;
};
export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
    [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateNotification[P]> : Prisma.GetScalarType<T[P], AggregateNotification[P]>;
};
export type NotificationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationWhereInput;
    orderBy?: Prisma.NotificationOrderByWithAggregationInput | Prisma.NotificationOrderByWithAggregationInput[];
    by: Prisma.NotificationScalarFieldEnum[] | Prisma.NotificationScalarFieldEnum;
    having?: Prisma.NotificationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: NotificationCountAggregateInputType | true;
    _min?: NotificationMinAggregateInputType;
    _max?: NotificationMaxAggregateInputType;
};
export type NotificationGroupByOutputType = {
    id: string;
    type: $Enums.NotificationType;
    channel: $Enums.NotificationChannel;
    message: string;
    sentAt: Date;
    customerId: string;
    extinguisherId: string;
    _count: NotificationCountAggregateOutputType | null;
    _min: NotificationMinAggregateOutputType | null;
    _max: NotificationMaxAggregateOutputType | null;
};
export type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<NotificationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], NotificationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], NotificationGroupByOutputType[P]>;
}>>;
export type NotificationWhereInput = {
    AND?: Prisma.NotificationWhereInput | Prisma.NotificationWhereInput[];
    OR?: Prisma.NotificationWhereInput[];
    NOT?: Prisma.NotificationWhereInput | Prisma.NotificationWhereInput[];
    id?: Prisma.StringFilter<"Notification"> | string;
    type?: Prisma.EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType;
    channel?: Prisma.EnumNotificationChannelFilter<"Notification"> | $Enums.NotificationChannel;
    message?: Prisma.StringFilter<"Notification"> | string;
    sentAt?: Prisma.DateTimeFilter<"Notification"> | Date | string;
    customerId?: Prisma.StringFilter<"Notification"> | string;
    extinguisherId?: Prisma.StringFilter<"Notification"> | string;
    customer?: Prisma.XOR<Prisma.CustomerScalarRelationFilter, Prisma.CustomerWhereInput>;
    extinguisher?: Prisma.XOR<Prisma.FireExtinguisherScalarRelationFilter, Prisma.FireExtinguisherWhereInput>;
};
export type NotificationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    extinguisherId?: Prisma.SortOrder;
    customer?: Prisma.CustomerOrderByWithRelationInput;
    extinguisher?: Prisma.FireExtinguisherOrderByWithRelationInput;
};
export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.NotificationWhereInput | Prisma.NotificationWhereInput[];
    OR?: Prisma.NotificationWhereInput[];
    NOT?: Prisma.NotificationWhereInput | Prisma.NotificationWhereInput[];
    type?: Prisma.EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType;
    channel?: Prisma.EnumNotificationChannelFilter<"Notification"> | $Enums.NotificationChannel;
    message?: Prisma.StringFilter<"Notification"> | string;
    sentAt?: Prisma.DateTimeFilter<"Notification"> | Date | string;
    customerId?: Prisma.StringFilter<"Notification"> | string;
    extinguisherId?: Prisma.StringFilter<"Notification"> | string;
    customer?: Prisma.XOR<Prisma.CustomerScalarRelationFilter, Prisma.CustomerWhereInput>;
    extinguisher?: Prisma.XOR<Prisma.FireExtinguisherScalarRelationFilter, Prisma.FireExtinguisherWhereInput>;
}, "id">;
export type NotificationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    extinguisherId?: Prisma.SortOrder;
    _count?: Prisma.NotificationCountOrderByAggregateInput;
    _max?: Prisma.NotificationMaxOrderByAggregateInput;
    _min?: Prisma.NotificationMinOrderByAggregateInput;
};
export type NotificationScalarWhereWithAggregatesInput = {
    AND?: Prisma.NotificationScalarWhereWithAggregatesInput | Prisma.NotificationScalarWhereWithAggregatesInput[];
    OR?: Prisma.NotificationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.NotificationScalarWhereWithAggregatesInput | Prisma.NotificationScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Notification"> | string;
    type?: Prisma.EnumNotificationTypeWithAggregatesFilter<"Notification"> | $Enums.NotificationType;
    channel?: Prisma.EnumNotificationChannelWithAggregatesFilter<"Notification"> | $Enums.NotificationChannel;
    message?: Prisma.StringWithAggregatesFilter<"Notification"> | string;
    sentAt?: Prisma.DateTimeWithAggregatesFilter<"Notification"> | Date | string;
    customerId?: Prisma.StringWithAggregatesFilter<"Notification"> | string;
    extinguisherId?: Prisma.StringWithAggregatesFilter<"Notification"> | string;
};
export type NotificationCreateInput = {
    id?: string;
    type: $Enums.NotificationType;
    channel?: $Enums.NotificationChannel;
    message: string;
    sentAt?: Date | string;
    customer: Prisma.CustomerCreateNestedOneWithoutNotificationsInput;
    extinguisher: Prisma.FireExtinguisherCreateNestedOneWithoutNotificationsInput;
};
export type NotificationUncheckedCreateInput = {
    id?: string;
    type: $Enums.NotificationType;
    channel?: $Enums.NotificationChannel;
    message: string;
    sentAt?: Date | string;
    customerId: string;
    extinguisherId: string;
};
export type NotificationUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType;
    channel?: Prisma.EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customer?: Prisma.CustomerUpdateOneRequiredWithoutNotificationsNestedInput;
    extinguisher?: Prisma.FireExtinguisherUpdateOneRequiredWithoutNotificationsNestedInput;
};
export type NotificationUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType;
    channel?: Prisma.EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    extinguisherId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type NotificationCreateManyInput = {
    id?: string;
    type: $Enums.NotificationType;
    channel?: $Enums.NotificationChannel;
    message: string;
    sentAt?: Date | string;
    customerId: string;
    extinguisherId: string;
};
export type NotificationUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType;
    channel?: Prisma.EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NotificationUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType;
    channel?: Prisma.EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    extinguisherId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type NotificationListRelationFilter = {
    every?: Prisma.NotificationWhereInput;
    some?: Prisma.NotificationWhereInput;
    none?: Prisma.NotificationWhereInput;
};
export type NotificationOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type NotificationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    extinguisherId?: Prisma.SortOrder;
};
export type NotificationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    extinguisherId?: Prisma.SortOrder;
};
export type NotificationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    extinguisherId?: Prisma.SortOrder;
};
export type NotificationCreateNestedManyWithoutCustomerInput = {
    create?: Prisma.XOR<Prisma.NotificationCreateWithoutCustomerInput, Prisma.NotificationUncheckedCreateWithoutCustomerInput> | Prisma.NotificationCreateWithoutCustomerInput[] | Prisma.NotificationUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutCustomerInput | Prisma.NotificationCreateOrConnectWithoutCustomerInput[];
    createMany?: Prisma.NotificationCreateManyCustomerInputEnvelope;
    connect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
};
export type NotificationUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: Prisma.XOR<Prisma.NotificationCreateWithoutCustomerInput, Prisma.NotificationUncheckedCreateWithoutCustomerInput> | Prisma.NotificationCreateWithoutCustomerInput[] | Prisma.NotificationUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutCustomerInput | Prisma.NotificationCreateOrConnectWithoutCustomerInput[];
    createMany?: Prisma.NotificationCreateManyCustomerInputEnvelope;
    connect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
};
export type NotificationUpdateManyWithoutCustomerNestedInput = {
    create?: Prisma.XOR<Prisma.NotificationCreateWithoutCustomerInput, Prisma.NotificationUncheckedCreateWithoutCustomerInput> | Prisma.NotificationCreateWithoutCustomerInput[] | Prisma.NotificationUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutCustomerInput | Prisma.NotificationCreateOrConnectWithoutCustomerInput[];
    upsert?: Prisma.NotificationUpsertWithWhereUniqueWithoutCustomerInput | Prisma.NotificationUpsertWithWhereUniqueWithoutCustomerInput[];
    createMany?: Prisma.NotificationCreateManyCustomerInputEnvelope;
    set?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    disconnect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    delete?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    connect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    update?: Prisma.NotificationUpdateWithWhereUniqueWithoutCustomerInput | Prisma.NotificationUpdateWithWhereUniqueWithoutCustomerInput[];
    updateMany?: Prisma.NotificationUpdateManyWithWhereWithoutCustomerInput | Prisma.NotificationUpdateManyWithWhereWithoutCustomerInput[];
    deleteMany?: Prisma.NotificationScalarWhereInput | Prisma.NotificationScalarWhereInput[];
};
export type NotificationUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: Prisma.XOR<Prisma.NotificationCreateWithoutCustomerInput, Prisma.NotificationUncheckedCreateWithoutCustomerInput> | Prisma.NotificationCreateWithoutCustomerInput[] | Prisma.NotificationUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutCustomerInput | Prisma.NotificationCreateOrConnectWithoutCustomerInput[];
    upsert?: Prisma.NotificationUpsertWithWhereUniqueWithoutCustomerInput | Prisma.NotificationUpsertWithWhereUniqueWithoutCustomerInput[];
    createMany?: Prisma.NotificationCreateManyCustomerInputEnvelope;
    set?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    disconnect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    delete?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    connect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    update?: Prisma.NotificationUpdateWithWhereUniqueWithoutCustomerInput | Prisma.NotificationUpdateWithWhereUniqueWithoutCustomerInput[];
    updateMany?: Prisma.NotificationUpdateManyWithWhereWithoutCustomerInput | Prisma.NotificationUpdateManyWithWhereWithoutCustomerInput[];
    deleteMany?: Prisma.NotificationScalarWhereInput | Prisma.NotificationScalarWhereInput[];
};
export type NotificationCreateNestedManyWithoutExtinguisherInput = {
    create?: Prisma.XOR<Prisma.NotificationCreateWithoutExtinguisherInput, Prisma.NotificationUncheckedCreateWithoutExtinguisherInput> | Prisma.NotificationCreateWithoutExtinguisherInput[] | Prisma.NotificationUncheckedCreateWithoutExtinguisherInput[];
    connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutExtinguisherInput | Prisma.NotificationCreateOrConnectWithoutExtinguisherInput[];
    createMany?: Prisma.NotificationCreateManyExtinguisherInputEnvelope;
    connect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
};
export type NotificationUncheckedCreateNestedManyWithoutExtinguisherInput = {
    create?: Prisma.XOR<Prisma.NotificationCreateWithoutExtinguisherInput, Prisma.NotificationUncheckedCreateWithoutExtinguisherInput> | Prisma.NotificationCreateWithoutExtinguisherInput[] | Prisma.NotificationUncheckedCreateWithoutExtinguisherInput[];
    connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutExtinguisherInput | Prisma.NotificationCreateOrConnectWithoutExtinguisherInput[];
    createMany?: Prisma.NotificationCreateManyExtinguisherInputEnvelope;
    connect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
};
export type NotificationUpdateManyWithoutExtinguisherNestedInput = {
    create?: Prisma.XOR<Prisma.NotificationCreateWithoutExtinguisherInput, Prisma.NotificationUncheckedCreateWithoutExtinguisherInput> | Prisma.NotificationCreateWithoutExtinguisherInput[] | Prisma.NotificationUncheckedCreateWithoutExtinguisherInput[];
    connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutExtinguisherInput | Prisma.NotificationCreateOrConnectWithoutExtinguisherInput[];
    upsert?: Prisma.NotificationUpsertWithWhereUniqueWithoutExtinguisherInput | Prisma.NotificationUpsertWithWhereUniqueWithoutExtinguisherInput[];
    createMany?: Prisma.NotificationCreateManyExtinguisherInputEnvelope;
    set?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    disconnect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    delete?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    connect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    update?: Prisma.NotificationUpdateWithWhereUniqueWithoutExtinguisherInput | Prisma.NotificationUpdateWithWhereUniqueWithoutExtinguisherInput[];
    updateMany?: Prisma.NotificationUpdateManyWithWhereWithoutExtinguisherInput | Prisma.NotificationUpdateManyWithWhereWithoutExtinguisherInput[];
    deleteMany?: Prisma.NotificationScalarWhereInput | Prisma.NotificationScalarWhereInput[];
};
export type NotificationUncheckedUpdateManyWithoutExtinguisherNestedInput = {
    create?: Prisma.XOR<Prisma.NotificationCreateWithoutExtinguisherInput, Prisma.NotificationUncheckedCreateWithoutExtinguisherInput> | Prisma.NotificationCreateWithoutExtinguisherInput[] | Prisma.NotificationUncheckedCreateWithoutExtinguisherInput[];
    connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutExtinguisherInput | Prisma.NotificationCreateOrConnectWithoutExtinguisherInput[];
    upsert?: Prisma.NotificationUpsertWithWhereUniqueWithoutExtinguisherInput | Prisma.NotificationUpsertWithWhereUniqueWithoutExtinguisherInput[];
    createMany?: Prisma.NotificationCreateManyExtinguisherInputEnvelope;
    set?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    disconnect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    delete?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    connect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    update?: Prisma.NotificationUpdateWithWhereUniqueWithoutExtinguisherInput | Prisma.NotificationUpdateWithWhereUniqueWithoutExtinguisherInput[];
    updateMany?: Prisma.NotificationUpdateManyWithWhereWithoutExtinguisherInput | Prisma.NotificationUpdateManyWithWhereWithoutExtinguisherInput[];
    deleteMany?: Prisma.NotificationScalarWhereInput | Prisma.NotificationScalarWhereInput[];
};
export type EnumNotificationTypeFieldUpdateOperationsInput = {
    set?: $Enums.NotificationType;
};
export type EnumNotificationChannelFieldUpdateOperationsInput = {
    set?: $Enums.NotificationChannel;
};
export type NotificationCreateWithoutCustomerInput = {
    id?: string;
    type: $Enums.NotificationType;
    channel?: $Enums.NotificationChannel;
    message: string;
    sentAt?: Date | string;
    extinguisher: Prisma.FireExtinguisherCreateNestedOneWithoutNotificationsInput;
};
export type NotificationUncheckedCreateWithoutCustomerInput = {
    id?: string;
    type: $Enums.NotificationType;
    channel?: $Enums.NotificationChannel;
    message: string;
    sentAt?: Date | string;
    extinguisherId: string;
};
export type NotificationCreateOrConnectWithoutCustomerInput = {
    where: Prisma.NotificationWhereUniqueInput;
    create: Prisma.XOR<Prisma.NotificationCreateWithoutCustomerInput, Prisma.NotificationUncheckedCreateWithoutCustomerInput>;
};
export type NotificationCreateManyCustomerInputEnvelope = {
    data: Prisma.NotificationCreateManyCustomerInput | Prisma.NotificationCreateManyCustomerInput[];
    skipDuplicates?: boolean;
};
export type NotificationUpsertWithWhereUniqueWithoutCustomerInput = {
    where: Prisma.NotificationWhereUniqueInput;
    update: Prisma.XOR<Prisma.NotificationUpdateWithoutCustomerInput, Prisma.NotificationUncheckedUpdateWithoutCustomerInput>;
    create: Prisma.XOR<Prisma.NotificationCreateWithoutCustomerInput, Prisma.NotificationUncheckedCreateWithoutCustomerInput>;
};
export type NotificationUpdateWithWhereUniqueWithoutCustomerInput = {
    where: Prisma.NotificationWhereUniqueInput;
    data: Prisma.XOR<Prisma.NotificationUpdateWithoutCustomerInput, Prisma.NotificationUncheckedUpdateWithoutCustomerInput>;
};
export type NotificationUpdateManyWithWhereWithoutCustomerInput = {
    where: Prisma.NotificationScalarWhereInput;
    data: Prisma.XOR<Prisma.NotificationUpdateManyMutationInput, Prisma.NotificationUncheckedUpdateManyWithoutCustomerInput>;
};
export type NotificationScalarWhereInput = {
    AND?: Prisma.NotificationScalarWhereInput | Prisma.NotificationScalarWhereInput[];
    OR?: Prisma.NotificationScalarWhereInput[];
    NOT?: Prisma.NotificationScalarWhereInput | Prisma.NotificationScalarWhereInput[];
    id?: Prisma.StringFilter<"Notification"> | string;
    type?: Prisma.EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType;
    channel?: Prisma.EnumNotificationChannelFilter<"Notification"> | $Enums.NotificationChannel;
    message?: Prisma.StringFilter<"Notification"> | string;
    sentAt?: Prisma.DateTimeFilter<"Notification"> | Date | string;
    customerId?: Prisma.StringFilter<"Notification"> | string;
    extinguisherId?: Prisma.StringFilter<"Notification"> | string;
};
export type NotificationCreateWithoutExtinguisherInput = {
    id?: string;
    type: $Enums.NotificationType;
    channel?: $Enums.NotificationChannel;
    message: string;
    sentAt?: Date | string;
    customer: Prisma.CustomerCreateNestedOneWithoutNotificationsInput;
};
export type NotificationUncheckedCreateWithoutExtinguisherInput = {
    id?: string;
    type: $Enums.NotificationType;
    channel?: $Enums.NotificationChannel;
    message: string;
    sentAt?: Date | string;
    customerId: string;
};
export type NotificationCreateOrConnectWithoutExtinguisherInput = {
    where: Prisma.NotificationWhereUniqueInput;
    create: Prisma.XOR<Prisma.NotificationCreateWithoutExtinguisherInput, Prisma.NotificationUncheckedCreateWithoutExtinguisherInput>;
};
export type NotificationCreateManyExtinguisherInputEnvelope = {
    data: Prisma.NotificationCreateManyExtinguisherInput | Prisma.NotificationCreateManyExtinguisherInput[];
    skipDuplicates?: boolean;
};
export type NotificationUpsertWithWhereUniqueWithoutExtinguisherInput = {
    where: Prisma.NotificationWhereUniqueInput;
    update: Prisma.XOR<Prisma.NotificationUpdateWithoutExtinguisherInput, Prisma.NotificationUncheckedUpdateWithoutExtinguisherInput>;
    create: Prisma.XOR<Prisma.NotificationCreateWithoutExtinguisherInput, Prisma.NotificationUncheckedCreateWithoutExtinguisherInput>;
};
export type NotificationUpdateWithWhereUniqueWithoutExtinguisherInput = {
    where: Prisma.NotificationWhereUniqueInput;
    data: Prisma.XOR<Prisma.NotificationUpdateWithoutExtinguisherInput, Prisma.NotificationUncheckedUpdateWithoutExtinguisherInput>;
};
export type NotificationUpdateManyWithWhereWithoutExtinguisherInput = {
    where: Prisma.NotificationScalarWhereInput;
    data: Prisma.XOR<Prisma.NotificationUpdateManyMutationInput, Prisma.NotificationUncheckedUpdateManyWithoutExtinguisherInput>;
};
export type NotificationCreateManyCustomerInput = {
    id?: string;
    type: $Enums.NotificationType;
    channel?: $Enums.NotificationChannel;
    message: string;
    sentAt?: Date | string;
    extinguisherId: string;
};
export type NotificationUpdateWithoutCustomerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType;
    channel?: Prisma.EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    extinguisher?: Prisma.FireExtinguisherUpdateOneRequiredWithoutNotificationsNestedInput;
};
export type NotificationUncheckedUpdateWithoutCustomerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType;
    channel?: Prisma.EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    extinguisherId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type NotificationUncheckedUpdateManyWithoutCustomerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType;
    channel?: Prisma.EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    extinguisherId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type NotificationCreateManyExtinguisherInput = {
    id?: string;
    type: $Enums.NotificationType;
    channel?: $Enums.NotificationChannel;
    message: string;
    sentAt?: Date | string;
    customerId: string;
};
export type NotificationUpdateWithoutExtinguisherInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType;
    channel?: Prisma.EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customer?: Prisma.CustomerUpdateOneRequiredWithoutNotificationsNestedInput;
};
export type NotificationUncheckedUpdateWithoutExtinguisherInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType;
    channel?: Prisma.EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type NotificationUncheckedUpdateManyWithoutExtinguisherInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType;
    channel?: Prisma.EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type NotificationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    type?: boolean;
    channel?: boolean;
    message?: boolean;
    sentAt?: boolean;
    customerId?: boolean;
    extinguisherId?: boolean;
    customer?: boolean | Prisma.CustomerDefaultArgs<ExtArgs>;
    extinguisher?: boolean | Prisma.FireExtinguisherDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["notification"]>;
export type NotificationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    type?: boolean;
    channel?: boolean;
    message?: boolean;
    sentAt?: boolean;
    customerId?: boolean;
    extinguisherId?: boolean;
    customer?: boolean | Prisma.CustomerDefaultArgs<ExtArgs>;
    extinguisher?: boolean | Prisma.FireExtinguisherDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["notification"]>;
export type NotificationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    type?: boolean;
    channel?: boolean;
    message?: boolean;
    sentAt?: boolean;
    customerId?: boolean;
    extinguisherId?: boolean;
    customer?: boolean | Prisma.CustomerDefaultArgs<ExtArgs>;
    extinguisher?: boolean | Prisma.FireExtinguisherDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["notification"]>;
export type NotificationSelectScalar = {
    id?: boolean;
    type?: boolean;
    channel?: boolean;
    message?: boolean;
    sentAt?: boolean;
    customerId?: boolean;
    extinguisherId?: boolean;
};
export type NotificationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "type" | "channel" | "message" | "sentAt" | "customerId" | "extinguisherId", ExtArgs["result"]["notification"]>;
export type NotificationInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    customer?: boolean | Prisma.CustomerDefaultArgs<ExtArgs>;
    extinguisher?: boolean | Prisma.FireExtinguisherDefaultArgs<ExtArgs>;
};
export type NotificationIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    customer?: boolean | Prisma.CustomerDefaultArgs<ExtArgs>;
    extinguisher?: boolean | Prisma.FireExtinguisherDefaultArgs<ExtArgs>;
};
export type NotificationIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    customer?: boolean | Prisma.CustomerDefaultArgs<ExtArgs>;
    extinguisher?: boolean | Prisma.FireExtinguisherDefaultArgs<ExtArgs>;
};
export type $NotificationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Notification";
    objects: {
        customer: Prisma.$CustomerPayload<ExtArgs>;
        extinguisher: Prisma.$FireExtinguisherPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        type: $Enums.NotificationType;
        channel: $Enums.NotificationChannel;
        message: string;
        sentAt: Date;
        customerId: string;
        extinguisherId: string;
    }, ExtArgs["result"]["notification"]>;
    composites: {};
};
export type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$NotificationPayload, S>;
export type NotificationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: NotificationCountAggregateInputType | true;
};
export interface NotificationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Notification'];
        meta: {
            name: 'Notification';
        };
    };
    findUnique<T extends NotificationFindUniqueArgs>(args: Prisma.SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends NotificationFindFirstArgs>(args?: Prisma.SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends NotificationFindManyArgs>(args?: Prisma.SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends NotificationCreateArgs>(args: Prisma.SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends NotificationCreateManyArgs>(args?: Prisma.SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends NotificationDeleteArgs>(args: Prisma.SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends NotificationUpdateArgs>(args: Prisma.SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends NotificationDeleteManyArgs>(args?: Prisma.SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends NotificationUpdateManyArgs>(args: Prisma.SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends NotificationUpsertArgs>(args: Prisma.SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends NotificationCountArgs>(args?: Prisma.Subset<T, NotificationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], NotificationCountAggregateOutputType> : number>;
    aggregate<T extends NotificationAggregateArgs>(args: Prisma.Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>;
    groupBy<T extends NotificationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: NotificationGroupByArgs['orderBy'];
    } : {
        orderBy?: NotificationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: NotificationFieldRefs;
}
export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    customer<T extends Prisma.CustomerDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CustomerDefaultArgs<ExtArgs>>): Prisma.Prisma__CustomerClient<runtime.Types.Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    extinguisher<T extends Prisma.FireExtinguisherDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FireExtinguisherDefaultArgs<ExtArgs>>): Prisma.Prisma__FireExtinguisherClient<runtime.Types.Result.GetResult<Prisma.$FireExtinguisherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface NotificationFieldRefs {
    readonly id: Prisma.FieldRef<"Notification", 'String'>;
    readonly type: Prisma.FieldRef<"Notification", 'NotificationType'>;
    readonly channel: Prisma.FieldRef<"Notification", 'NotificationChannel'>;
    readonly message: Prisma.FieldRef<"Notification", 'String'>;
    readonly sentAt: Prisma.FieldRef<"Notification", 'DateTime'>;
    readonly customerId: Prisma.FieldRef<"Notification", 'String'>;
    readonly extinguisherId: Prisma.FieldRef<"Notification", 'String'>;
}
export type NotificationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    include?: Prisma.NotificationInclude<ExtArgs> | null;
    where: Prisma.NotificationWhereUniqueInput;
};
export type NotificationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    include?: Prisma.NotificationInclude<ExtArgs> | null;
    where: Prisma.NotificationWhereUniqueInput;
};
export type NotificationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type NotificationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type NotificationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type NotificationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    include?: Prisma.NotificationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.NotificationCreateInput, Prisma.NotificationUncheckedCreateInput>;
};
export type NotificationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.NotificationCreateManyInput | Prisma.NotificationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type NotificationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    data: Prisma.NotificationCreateManyInput | Prisma.NotificationCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.NotificationIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type NotificationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    include?: Prisma.NotificationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.NotificationUpdateInput, Prisma.NotificationUncheckedUpdateInput>;
    where: Prisma.NotificationWhereUniqueInput;
};
export type NotificationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.NotificationUpdateManyMutationInput, Prisma.NotificationUncheckedUpdateManyInput>;
    where?: Prisma.NotificationWhereInput;
    limit?: number;
};
export type NotificationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.NotificationUpdateManyMutationInput, Prisma.NotificationUncheckedUpdateManyInput>;
    where?: Prisma.NotificationWhereInput;
    limit?: number;
    include?: Prisma.NotificationIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type NotificationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    include?: Prisma.NotificationInclude<ExtArgs> | null;
    where: Prisma.NotificationWhereUniqueInput;
    create: Prisma.XOR<Prisma.NotificationCreateInput, Prisma.NotificationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.NotificationUpdateInput, Prisma.NotificationUncheckedUpdateInput>;
};
export type NotificationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    include?: Prisma.NotificationInclude<ExtArgs> | null;
    where: Prisma.NotificationWhereUniqueInput;
};
export type NotificationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationWhereInput;
    limit?: number;
};
export type NotificationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    include?: Prisma.NotificationInclude<ExtArgs> | null;
};
