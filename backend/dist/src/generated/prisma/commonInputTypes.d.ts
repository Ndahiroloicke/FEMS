import * as $Enums from "./enums";
import type * as Prisma from "./internal/prismaNamespace";
export type StringFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringFilter<$PrismaModel> | string;
};
export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringNullableFilter<$PrismaModel> | string | null;
};
export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string;
};
export type SortOrderInput = {
    sort: Prisma.SortOrder;
    nulls?: Prisma.NullsOrder;
};
export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeFilter<$PrismaModel>;
};
export type EnumExtinguisherStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ExtinguisherStatus | Prisma.EnumExtinguisherStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ExtinguisherStatus[] | Prisma.ListEnumExtinguisherStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ExtinguisherStatus[] | Prisma.ListEnumExtinguisherStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumExtinguisherStatusFilter<$PrismaModel> | $Enums.ExtinguisherStatus;
};
export type EnumExtinguisherStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExtinguisherStatus | Prisma.EnumExtinguisherStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ExtinguisherStatus[] | Prisma.ListEnumExtinguisherStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ExtinguisherStatus[] | Prisma.ListEnumExtinguisherStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumExtinguisherStatusWithAggregatesFilter<$PrismaModel> | $Enums.ExtinguisherStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumExtinguisherStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumExtinguisherStatusFilter<$PrismaModel>;
};
export type EnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | Prisma.EnumNotificationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType;
};
export type EnumNotificationChannelFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationChannel | Prisma.EnumNotificationChannelFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationChannel[] | Prisma.ListEnumNotificationChannelFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationChannel[] | Prisma.ListEnumNotificationChannelFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationChannelFilter<$PrismaModel> | $Enums.NotificationChannel;
};
export type EnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | Prisma.EnumNotificationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel>;
};
export type EnumNotificationChannelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationChannel | Prisma.EnumNotificationChannelFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationChannel[] | Prisma.ListEnumNotificationChannelFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationChannel[] | Prisma.ListEnumNotificationChannelFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationChannelWithAggregatesFilter<$PrismaModel> | $Enums.NotificationChannel;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotificationChannelFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotificationChannelFilter<$PrismaModel>;
};
export type EnumEscalationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EscalationStatus | Prisma.EnumEscalationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.EscalationStatus[] | Prisma.ListEnumEscalationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.EscalationStatus[] | Prisma.ListEnumEscalationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumEscalationStatusFilter<$PrismaModel> | $Enums.EscalationStatus;
};
export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
};
export type EnumEscalationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EscalationStatus | Prisma.EnumEscalationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.EscalationStatus[] | Prisma.ListEnumEscalationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.EscalationStatus[] | Prisma.ListEnumEscalationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumEscalationStatusWithAggregatesFilter<$PrismaModel> | $Enums.EscalationStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumEscalationStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumEscalationStatusFilter<$PrismaModel>;
};
export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
};
export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringFilter<$PrismaModel> | string;
};
export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringNullableFilter<$PrismaModel> | string | null;
};
export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string;
};
export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntFilter<$PrismaModel> | number;
};
export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableFilter<$PrismaModel> | number | null;
};
export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeFilter<$PrismaModel>;
};
export type NestedEnumExtinguisherStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ExtinguisherStatus | Prisma.EnumExtinguisherStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ExtinguisherStatus[] | Prisma.ListEnumExtinguisherStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ExtinguisherStatus[] | Prisma.ListEnumExtinguisherStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumExtinguisherStatusFilter<$PrismaModel> | $Enums.ExtinguisherStatus;
};
export type NestedEnumExtinguisherStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExtinguisherStatus | Prisma.EnumExtinguisherStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ExtinguisherStatus[] | Prisma.ListEnumExtinguisherStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ExtinguisherStatus[] | Prisma.ListEnumExtinguisherStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumExtinguisherStatusWithAggregatesFilter<$PrismaModel> | $Enums.ExtinguisherStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumExtinguisherStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumExtinguisherStatusFilter<$PrismaModel>;
};
export type NestedEnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | Prisma.EnumNotificationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType;
};
export type NestedEnumNotificationChannelFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationChannel | Prisma.EnumNotificationChannelFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationChannel[] | Prisma.ListEnumNotificationChannelFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationChannel[] | Prisma.ListEnumNotificationChannelFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationChannelFilter<$PrismaModel> | $Enums.NotificationChannel;
};
export type NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | Prisma.EnumNotificationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel>;
};
export type NestedEnumNotificationChannelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationChannel | Prisma.EnumNotificationChannelFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationChannel[] | Prisma.ListEnumNotificationChannelFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationChannel[] | Prisma.ListEnumNotificationChannelFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationChannelWithAggregatesFilter<$PrismaModel> | $Enums.NotificationChannel;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotificationChannelFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotificationChannelFilter<$PrismaModel>;
};
export type NestedEnumEscalationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EscalationStatus | Prisma.EnumEscalationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.EscalationStatus[] | Prisma.ListEnumEscalationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.EscalationStatus[] | Prisma.ListEnumEscalationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumEscalationStatusFilter<$PrismaModel> | $Enums.EscalationStatus;
};
export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
};
export type NestedEnumEscalationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EscalationStatus | Prisma.EnumEscalationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.EscalationStatus[] | Prisma.ListEnumEscalationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.EscalationStatus[] | Prisma.ListEnumEscalationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumEscalationStatusWithAggregatesFilter<$PrismaModel> | $Enums.EscalationStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumEscalationStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumEscalationStatusFilter<$PrismaModel>;
};
export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
};
