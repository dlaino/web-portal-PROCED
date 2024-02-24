import {
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsBoolean,
  IsDateString,
  IsUUID,
  IsEmail,
} from 'class-validator';
import { RequirementType, RequestStatus } from '../entities/medical_req.entity';
import { Gender } from '../../common/enums/gender.enum';
import { IdType } from '../../common/enums/id_type.enum';
import { UserRolType } from '../../common/enums/user_roles.enum';

export class CreateMedicalReqEpsDto {
  @IsNotEmpty()
  @IsEnum(RequirementType)
  requirement_type: RequirementType;

  @IsOptional()
  @IsString()
  aplicant_name: string;

  @IsOptional()
  @IsString()
  aplicant_last_name: string;

  @IsOptional()
  @IsEnum(Gender)
  aplicant_gender: Gender;

  @IsOptional()
  @IsEnum(IdType)
  aplicant_id_type: IdType;

  @IsOptional()
  @IsNumber()
  aplicant_id_number: number;

  @IsOptional()
  @IsEmail()
  aplicant_email: string;

  @IsOptional()
  @IsString()
  aplicant_company_name: string;

  @IsOptional()
  @IsString()
  aplicant_company_area: string;

  @IsNotEmpty()
  @IsEnum(IdType)
  patient_id_type: IdType;

  @IsNotEmpty()
  @IsNumber()
  patient_id_number: number;

  @IsOptional()
  @IsDateString()
  patient_id_exp_date: Date;

  @IsOptional()
  @IsDateString()
  date_of_admission: Date;

  @IsOptional()
  @IsDateString()
  answer_date: Date;

  @IsOptional()
  @IsDateString()
  download_expiration_date: Date;

  @IsOptional()
  @IsEnum(RequestStatus)
  request_status: RequestStatus;

  @IsOptional()
  @IsBoolean()
  is_deleted: boolean;

  @IsOptional()
  @IsUUID()
  aplicantId: string;

  @IsOptional()
  @IsEnum(UserRolType)
  medicalReqUserType: UserRolType;
}
