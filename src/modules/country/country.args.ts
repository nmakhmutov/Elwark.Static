import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CountriesArgs {
    @Field(() => [String], { nullable: true })
    codes: string[]
}