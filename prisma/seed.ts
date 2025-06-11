import { PrismaClient, PlayerRole, TeamType, SeriesType, MatchFormat, MatchStatus, ResultType, TossDecision } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // 1. Countries
    const countriesData = [
        { code: 'IND', name: 'India', flagUrl: 'https://flagcdn.com/in.svg' },
        { code: 'AUS', name: 'Australia', flagUrl: 'https://flagcdn.com/au.svg' },
        { code: 'ENG', name: 'England', flagUrl: 'https://flagcdn.com/gb-eng.svg' },
        { code: 'PAK', name: 'Pakistan', flagUrl: 'https://flagcdn.com/pk.svg' },
        { code: 'SA',  name: 'South Africa', flagUrl: 'https://flagcdn.com/za.svg' },
        { code: 'NZ',  name: 'New Zealand', flagUrl: 'https://flagcdn.com/nz.svg' },
        { code: 'SL',  name: 'Sri Lanka', flagUrl: 'https://flagcdn.com/lk.svg' },
        { code: 'BAN', name: 'Bangladesh', flagUrl: 'https://flagcdn.com/bd.svg' },
        { code: 'WI',  name: 'West Indies', flagUrl: 'https://flagcdn.com/jm.svg' }, // Jamaica flag as rep
        { code: 'AFG', name: 'Afghanistan', flagUrl: 'https://flagcdn.com/af.svg' },
        { code: 'ZIM', name: 'Zimbabwe', flagUrl: 'https://flagcdn.com/zw.svg' },
        { code: 'IRE', name: 'Ireland', flagUrl: 'https://flagcdn.com/ie.svg' },
        { code: 'NAM', name: 'Namibia', flagUrl: 'https://flagcdn.com/na.svg' },
        { code: 'SCO', name: 'Scotland', flagUrl: 'https://flagcdn.com/gb-sct.svg' },
        { code: 'NEP', name: 'Nepal', flagUrl: 'https://flagcdn.com/np.svg' },
    ];
    const countries: any = {};
    for (const c of countriesData) {
        countries[c.code] = await prisma.country.create({ data: c });
    }

    // 2. Teams (International only for seed; expand as needed)
    const teamsData = [
        // International
        { name: 'India National Cricket Team', type: TeamType.INTERNATIONAL, countryId: countries.IND.id, logoUrl: null },
        { name: 'Australia National Cricket Team', type: TeamType.INTERNATIONAL, countryId: countries.AUS.id, logoUrl: null },
        { name: 'England National Cricket Team', type: TeamType.INTERNATIONAL, countryId: countries.ENG.id, logoUrl: null },
        { name: 'Pakistan National Cricket Team', type: TeamType.INTERNATIONAL, countryId: countries.PAK.id, logoUrl: null },
        { name: 'South Africa National Cricket Team', type: TeamType.INTERNATIONAL, countryId: countries.SA.id, logoUrl: null },
        { name: 'New Zealand National Cricket Team', type: TeamType.INTERNATIONAL, countryId: countries.NZ.id, logoUrl: null },
        { name: 'Sri Lanka National Cricket Team', type: TeamType.INTERNATIONAL, countryId: countries.SL.id, logoUrl: null },
        { name: 'Bangladesh National Cricket Team', type: TeamType.INTERNATIONAL, countryId: countries.BAN.id, logoUrl: null },
        { name: 'West Indies National Cricket Team', type: TeamType.INTERNATIONAL, countryId: countries.WI.id, logoUrl: null },
        { name: 'Afghanistan National Cricket Team', type: TeamType.INTERNATIONAL, countryId: countries.AFG.id, logoUrl: null },
        { name: 'Zimbabwe National Cricket Team', type: TeamType.INTERNATIONAL, countryId: countries.ZIM.id, logoUrl: null },
        { name: 'Ireland National Cricket Team', type: TeamType.INTERNATIONAL, countryId: countries.IRE.id, logoUrl: null },
        { name: 'Namibia National Cricket Team', type: TeamType.INTERNATIONAL, countryId: countries.NAM.id, logoUrl: null },
        { name: 'Scotland National Cricket Team', type: TeamType.INTERNATIONAL, countryId: countries.SCO.id, logoUrl: null },
        { name: 'Nepal National Cricket Team', type: TeamType.INTERNATIONAL, countryId: countries.NEP.id, logoUrl: null },
        // Example League Teams
        { name: 'Mumbai Indians', type: TeamType.LEAGUE, countryId: countries.IND.id, logoUrl: null },
        { name: 'Sydney Sixers', type: TeamType.LEAGUE, countryId: countries.AUS.id, logoUrl: null },
        { name: 'Colombo Stars', type: TeamType.LEAGUE, countryId: countries.SL.id, logoUrl: null },
        // Example Domestic Teams
        { name: 'Delhi', type: TeamType.DOMESTIC, countryId: countries.IND.id, logoUrl: null },
        { name: 'Victoria', type: TeamType.DOMESTIC, countryId: countries.AUS.id, logoUrl: null },
        { name: 'KwaZulu-Natal', type: TeamType.DOMESTIC, countryId: countries.SA.id, logoUrl: null },
    ];
    const teams: any = {};
    for (const t of teamsData) {
        teams[t.name] = await prisma.team.create({ data: t });
    }

    // 3. Players (a mix of famous, random, active/inactive; all countries)
    const playersData = [
        // India
        { fullName: 'Virat Kohli', dob: new Date('1988-11-05'), countryId: countries.IND.id, role: PlayerRole.BATSMAN, active: true },
        { fullName: 'MS Dhoni', dob: new Date('1981-07-07'), countryId: countries.IND.id, role: PlayerRole.WICKET_KEEPER, active: false },
        { fullName: 'Jasprit Bumrah', dob: new Date('1993-12-06'), countryId: countries.IND.id, role: PlayerRole.BOWLER, active: true },
        { fullName: 'Rohit Sharma', dob: new Date('1987-04-30'), countryId: countries.IND.id, role: PlayerRole.BATSMAN, active: true },
        { fullName: 'Shubman Gill', dob: new Date('1999-09-08'), countryId: countries.IND.id, role: PlayerRole.BATSMAN, active: true },
        { fullName: 'Ravindra Jadeja', dob: new Date('1988-12-06'), countryId: countries.IND.id, role: PlayerRole.ALL_ROUNDER, active: true },
        { fullName: 'Ravichandran Ashwin', dob: new Date('1986-09-17'), countryId: countries.IND.id, role: PlayerRole.BOWLER, active: true },
        { fullName: 'Yuvraj Singh', dob: new Date('1981-12-12'), countryId: countries.IND.id, role: PlayerRole.ALL_ROUNDER, active: false },
        { fullName: 'Sachin Tendulkar', dob: new Date('1973-04-24'), countryId: countries.IND.id, role: PlayerRole.BATSMAN, active: false },
        { fullName: 'Harbhajan Singh', dob: new Date('1980-07-03'), countryId: countries.IND.id, role: PlayerRole.BOWLER, active: false },
        // Australia
        { fullName: 'Steve Smith', dob: new Date('1989-06-02'), countryId: countries.AUS.id, role: PlayerRole.BATSMAN, active: true },
        { fullName: 'Glenn Maxwell', dob: new Date('1988-10-14'), countryId: countries.AUS.id, role: PlayerRole.ALL_ROUNDER, active: true },
        { fullName: 'Adam Gilchrist', dob: new Date('1971-11-14'), countryId: countries.AUS.id, role: PlayerRole.WICKET_KEEPER, active: false },
        { fullName: 'David Warner', dob: new Date('1986-10-27'), countryId: countries.AUS.id, role: PlayerRole.BATSMAN, active: true },
        { fullName: 'Pat Cummins', dob: new Date('1993-05-08'), countryId: countries.AUS.id, role: PlayerRole.BOWLER, active: true },
        { fullName: 'Mitchell Starc', dob: new Date('1990-01-30'), countryId: countries.AUS.id, role: PlayerRole.BOWLER, active: true },
        { fullName: 'Shane Watson', dob: new Date('1981-06-17'), countryId: countries.AUS.id, role: PlayerRole.ALL_ROUNDER, active: false },
        { fullName: 'Ricky Ponting', dob: new Date('1974-12-19'), countryId: countries.AUS.id, role: PlayerRole.BATSMAN, active: false },
        { fullName: 'Matthew Hayden', dob: new Date('1971-10-29'), countryId: countries.AUS.id, role: PlayerRole.BATSMAN, active: false },
        { fullName: 'Brett Lee', dob: new Date('1976-11-08'), countryId: countries.AUS.id, role: PlayerRole.BOWLER, active: false },
        // England
        { fullName: 'Joe Root', dob: new Date('1990-12-30'), countryId: countries.ENG.id, role: PlayerRole.BATSMAN, active: true },
        { fullName: 'Ben Stokes', dob: new Date('1991-06-04'), countryId: countries.ENG.id, role: PlayerRole.ALL_ROUNDER, active: true },
        { fullName: 'James Anderson', dob: new Date('1982-07-30'), countryId: countries.ENG.id, role: PlayerRole.BOWLER, active: true },
        { fullName: 'Jos Buttler', dob: new Date('1990-09-08'), countryId: countries.ENG.id, role: PlayerRole.WICKET_KEEPER, active: true },
        { fullName: 'Stuart Broad', dob: new Date('1986-06-24'), countryId: countries.ENG.id, role: PlayerRole.BOWLER, active: false },
        { fullName: 'Alastair Cook', dob: new Date('1984-12-25'), countryId: countries.ENG.id, role: PlayerRole.BATSMAN, active: false },
        { fullName: 'Andrew Flintoff', dob: new Date('1977-12-06'), countryId: countries.ENG.id, role: PlayerRole.ALL_ROUNDER, active: false },
        { fullName: 'Kevin Pietersen', dob: new Date('1980-06-27'), countryId: countries.ENG.id, role: PlayerRole.BATSMAN, active: false },
        { fullName: 'Graham Swann', dob: new Date('1979-03-24'), countryId: countries.ENG.id, role: PlayerRole.BOWLER, active: false },
        { fullName: 'Eoin Morgan', dob: new Date('1986-09-10'), countryId: countries.ENG.id, role: PlayerRole.BATSMAN, active: false },
        // Pakistan
        { fullName: 'Babar Azam', dob: new Date('1994-10-15'), countryId: countries.PAK.id, role: PlayerRole.BATSMAN, active: true },
        { fullName: 'Wasim Akram', dob: new Date('1966-06-03'), countryId: countries.PAK.id, role: PlayerRole.BOWLER, active: false },
        { fullName: 'Shaheen Afridi', dob: new Date('2000-04-06'), countryId: countries.PAK.id, role: PlayerRole.BOWLER, active: true },
        { fullName: 'Shadab Khan', dob: new Date('1998-10-04'), countryId: countries.PAK.id, role: PlayerRole.ALL_ROUNDER, active: true },
        { fullName: 'Mohammad Rizwan', dob: new Date('1992-06-01'), countryId: countries.PAK.id, role: PlayerRole.WICKET_KEEPER, active: true },
        { fullName: 'Shoaib Malik', dob: new Date('1982-02-01'), countryId: countries.PAK.id, role: PlayerRole.ALL_ROUNDER, active: false },
        { fullName: 'Imran Khan', dob: new Date('1952-10-05'), countryId: countries.PAK.id, role: PlayerRole.ALL_ROUNDER, active: false },
        { fullName: 'Inzamam-ul-Haq', dob: new Date('1970-03-03'), countryId: countries.PAK.id, role: PlayerRole.BATSMAN, active: false },
        { fullName: 'Saeed Anwar', dob: new Date('1968-09-06'), countryId: countries.PAK.id, role: PlayerRole.BATSMAN, active: false },
        { fullName: 'Shoaib Akhtar', dob: new Date('1975-08-13'), countryId: countries.PAK.id, role: PlayerRole.BOWLER, active: false },
        // South Africa
        { fullName: 'AB de Villiers', dob: new Date('1984-02-17'), countryId: countries.SA.id, role: PlayerRole.BATSMAN, active: false },
        { fullName: 'Kagiso Rabada', dob: new Date('1995-05-25'), countryId: countries.SA.id, role: PlayerRole.BOWLER, active: true },
        { fullName: 'Quinton de Kock', dob: new Date('1992-12-17'), countryId: countries.SA.id, role: PlayerRole.WICKET_KEEPER, active: true },
        { fullName: 'Faf du Plessis', dob: new Date('1984-07-13'), countryId: countries.SA.id, role: PlayerRole.BATSMAN, active: true },
        { fullName: 'Dale Steyn', dob: new Date('1983-06-27'), countryId: countries.SA.id, role: PlayerRole.BOWLER, active: false },
        { fullName: 'Hashim Amla', dob: new Date('1983-03-31'), countryId: countries.SA.id, role: PlayerRole.BATSMAN, active: false },
        { fullName: 'Graeme Smith', dob: new Date('1981-02-01'), countryId: countries.SA.id, role: PlayerRole.BATSMAN, active: false },
        { fullName: 'Morne Morkel', dob: new Date('1984-10-06'), countryId: countries.SA.id, role: PlayerRole.BOWLER, active: false },
        { fullName: 'JP Duminy', dob: new Date('1984-04-14'), countryId: countries.SA.id, role: PlayerRole.ALL_ROUNDER, active: false },
        { fullName: 'Vernon Philander', dob: new Date('1985-06-24'), countryId: countries.SA.id, role: PlayerRole.BOWLER, active: false },
        // NEW ZEALAND
        { fullName: 'Kane Williamson', dob: new Date('1990-08-08'), countryId: countries.NZ.id, role: PlayerRole.BATSMAN, active: true },
        { fullName: 'Trent Boult', dob: new Date('1989-07-22'), countryId: countries.NZ.id, role: PlayerRole.BOWLER, active: true },
        { fullName: 'Tim Southee', dob: new Date('1988-12-11'), countryId: countries.NZ.id, role: PlayerRole.BOWLER, active: true },
        { fullName: 'Martin Guptill', dob: new Date('1986-09-30'), countryId: countries.NZ.id, role: PlayerRole.BATSMAN, active: false },
        { fullName: 'Ross Taylor', dob: new Date('1984-03-08'), countryId: countries.NZ.id, role: PlayerRole.BATSMAN, active: false },
        { fullName: 'Tom Latham', dob: new Date('1992-04-02'), countryId: countries.NZ.id, role: PlayerRole.WICKET_KEEPER, active: true },
        { fullName: 'Brendon McCullum', dob: new Date('1981-09-27'), countryId: countries.NZ.id, role: PlayerRole.WICKET_KEEPER, active: false },
        { fullName: 'Daniel Vettori', dob: new Date('1979-01-27'), countryId: countries.NZ.id, role: PlayerRole.BOWLER, active: false },
        { fullName: 'Jimmy Neesham', dob: new Date('1990-09-17'), countryId: countries.NZ.id, role: PlayerRole.ALL_ROUNDER, active: true },
        { fullName: 'Daryl Mitchell', dob: new Date('1991-05-20'), countryId: countries.NZ.id, role: PlayerRole.ALL_ROUNDER, active: true },
        // West Indies
        { fullName: 'Chris Gayle', dob: new Date('1979-09-21'), countryId: countries.WI.id, role: PlayerRole.ALL_ROUNDER, active: false },
        { fullName: 'Jason Holder', dob: new Date('1991-11-05'), countryId: countries.WI.id, role: PlayerRole.ALL_ROUNDER, active: true },
        // Afghanistan
        { fullName: 'Rashid Khan', dob: new Date('1998-09-20'), countryId: countries.AFG.id, role: PlayerRole.BOWLER, active: true },
        // Bangladesh
        { fullName: 'Shakib Al Hasan', dob: new Date('1987-03-24'), countryId: countries.BAN.id, role: PlayerRole.ALL_ROUNDER, active: true },
        // Sri Lanka
        { fullName: 'Kumar Sangakkara', dob: new Date('1977-10-27'), countryId: countries.SL.id, role: PlayerRole.WICKET_KEEPER, active: false },
        // Ireland
        { fullName: 'Paul Stirling', dob: new Date('1990-09-03'), countryId: countries.IRE.id, role: PlayerRole.ALL_ROUNDER, active: true },
        // Nepal
        { fullName: 'Sandeep Lamichhane', dob: new Date('2000-08-02'), countryId: countries.NEP.id, role: PlayerRole.BOWLER, active: true },
        // Namibia
        { fullName: 'Gerhard Erasmus', dob: new Date('1995-04-11'), countryId: countries.NAM.id, role: PlayerRole.ALL_ROUNDER, active: true },
        // Zimbabwe
        { fullName: 'Sean Williams', dob: new Date('1986-09-26'), countryId: countries.ZIM.id, role: PlayerRole.ALL_ROUNDER, active: true },
        // Scotland
        { fullName: 'Kyle Coetzer', dob: new Date('1984-04-14'), countryId: countries.SCO.id, role: PlayerRole.BATSMAN, active: false },
    ];
    const players: any = {};
    for (const p of playersData) {
        players[p.fullName] = await prisma.player.create({
            data: {
                ...p,
                battingStyle: null,
                bowlingStyle: null,
            },
        });
    }

    // 4. Venues
    const venuesData = [
        // INDIA
        { name: 'Wankhede Stadium', city: 'Mumbai', countryId: countries.IND.id, capacity: 33000, pitchType: 'Batting' },
        { name: 'Narendra Modi Stadium', city: 'Ahmedabad', countryId: countries.IND.id, capacity: 132000, pitchType: 'Balanced' },
        { name: 'Himachal Pradesh Cricket Association Stadium', city: 'Dharamsala', countryId: countries.IND.id, capacity: 23000, pitchType: 'Seaming' },
        { name: 'Eden Gardens', city: 'Kolkata', countryId: countries.IND.id, capacity: 66000, pitchType: 'Batting' },
        { name: 'M. A. Chidambaram Stadium', city: 'Chennai', countryId: countries.IND.id, capacity: 50000, pitchType: 'Spinning' },
        { name: 'Arun Jaitley Stadium', city: 'Delhi', countryId: countries.IND.id, capacity: 41000, pitchType: 'Batting' },

        // AUSTRALIA
        { name: 'Melbourne Cricket Ground', city: 'Melbourne', countryId: countries.AUS.id, capacity: 100024, pitchType: 'Balanced' },
        { name: 'Sydney Cricket Ground', city: 'Sydney', countryId: countries.AUS.id, capacity: 48000, pitchType: 'Spinning' },
        { name: 'Adelaide Oval', city: 'Adelaide', countryId: countries.AUS.id, capacity: 53583, pitchType: 'Batting' },
        { name: 'The Gabba', city: 'Brisbane', countryId: countries.AUS.id, capacity: 42000, pitchType: 'Seaming' },
        { name: 'Perth Stadium', city: 'Perth', countryId: countries.AUS.id, capacity: 60000, pitchType: 'Pace' },

        // ENGLAND
        { name: 'Lord\'s', city: 'London', countryId: countries.ENG.id, capacity: 30000, pitchType: 'Seaming' },
        { name: 'The Oval', city: 'London', countryId: countries.ENG.id, capacity: 25500, pitchType: 'Batting' },
        { name: 'Old Trafford', city: 'Manchester', countryId: countries.ENG.id, capacity: 26500, pitchType: 'Seaming' },
        { name: 'Headingley', city: 'Leeds', countryId: countries.ENG.id, capacity: 18000, pitchType: 'Seaming' },
        { name: 'Edgbaston', city: 'Birmingham', countryId: countries.ENG.id, capacity: 25000, pitchType: 'Batting' },

        // PAKISTAN
        { name: 'Gaddafi Stadium', city: 'Lahore', countryId: countries.PAK.id, capacity: 27000, pitchType: 'Batting' },
        { name: 'National Stadium', city: 'Karachi', countryId: countries.PAK.id, capacity: 34000, pitchType: 'Batting' },
        { name: 'Rawalpindi Cricket Stadium', city: 'Rawalpindi', countryId: countries.PAK.id, capacity: 15000, pitchType: 'Balanced' },
        { name: 'Multan Cricket Stadium', city: 'Multan', countryId: countries.PAK.id, capacity: 35000, pitchType: 'Batting' },

        // NEW ZEALAND
        { name: 'Eden Park', city: 'Auckland', countryId: countries.NZ.id, capacity: 50000, pitchType: 'Balanced' },
        { name: 'Hagley Oval', city: 'Christchurch', countryId: countries.NZ.id, capacity: 18000, pitchType: 'Batting' },
        { name: 'Basin Reserve', city: 'Wellington', countryId: countries.NZ.id, capacity: 11000, pitchType: 'Seaming' },
        { name: 'Seddon Park', city: 'Hamilton', countryId: countries.NZ.id, capacity: 10000, pitchType: 'Batting' },

        // SOUTH AFRICA
        { name: 'Newlands', city: 'Cape Town', countryId: countries.SA.id, capacity: 25000, pitchType: 'Seaming' },
        { name: 'Wanderers Stadium', city: 'Johannesburg', countryId: countries.SA.id, capacity: 34000, pitchType: 'Batting' },
        { name: 'Kingsmead', city: 'Durban', countryId: countries.SA.id, capacity: 25000, pitchType: 'Balanced' },
        { name: 'SuperSport Park', city: 'Centurion', countryId: countries.SA.id, capacity: 22000, pitchType: 'Batting' },

        // SRI LANKA
        { name: 'R. Premadasa Stadium', city: 'Colombo', countryId: countries.SL.id, capacity: 35000, pitchType: 'Batting' },
        { name: 'Galle International Stadium', city: 'Galle', countryId: countries.SL.id, capacity: 35000, pitchType: 'Spinning' },
        { name: 'Pallekele International Cricket Stadium', city: 'Kandy', countryId: countries.SL.id, capacity: 35000, pitchType: 'Balanced' },

        // BANGLADESH
        { name: 'Sher-e-Bangla National Cricket Stadium', city: 'Dhaka', countryId: countries.BAN.id, capacity: 25000, pitchType: 'Batting' },
        { name: 'Zahur Ahmed Chowdhury Stadium', city: 'Chattogram', countryId: countries.BAN.id, capacity: 20000, pitchType: 'Spinning' },

        // WEST INDIES
        { name: 'Kensington Oval', city: 'Bridgetown', countryId: countries.WI.id, capacity: 28000, pitchType: 'Batting' },
        { name: 'Sabina Park', city: 'Kingston', countryId: countries.WI.id, capacity: 20000, pitchType: 'Batting' },

        // AFGHANISTAN
        { name: 'Kabul International Cricket Stadium', city: 'Kabul', countryId: countries.AFG.id, capacity: 6000, pitchType: 'Batting' },

        // ZIMBABWE
        { name: 'Harare Sports Club', city: 'Harare', countryId: countries.ZIM.id, capacity: 10000, pitchType: 'Balanced' },
        { name: 'Queens Sports Club', city: 'Bulawayo', countryId: countries.ZIM.id, capacity: 13000, pitchType: 'Balanced' },

        // IRELAND
        { name: 'Malahide Cricket Club Ground', city: 'Dublin', countryId: countries.IRE.id, capacity: 11000, pitchType: 'Seaming' },

        // SCOTLAND
        { name: 'The Grange Club', city: 'Edinburgh', countryId: countries.SCO.id, capacity: 5000, pitchType: 'Balanced' },

        // NAMIBIA
        { name: 'Wanderers Cricket Ground', city: 'Windhoek', countryId: countries.NAM.id, capacity: 5000, pitchType: 'Batting' },

        // NEPAL
        { name: 'Tribhuvan University International Cricket Ground', city: 'Kirtipur', countryId: countries.NEP.id, capacity: 20000, pitchType: 'Batting' }
    ];
    const venues: any = {};
    for (const v of venuesData) {
        venues[v.name] = await prisma.venue.create({ data: v });
    }

    const seriesList = [
        {
            name: 'The Ashes 2023',
            description: 'England vs Australia Test Series',
            type: SeriesType.BILATERAL,
            startDate: new Date('2023-06-16'),
            endDate: new Date('2023-07-31'),
            hosts: { create: [{ countryId: countries.ENG.id }] },
            seriesTeams: { create: [
                    { teamId: teams['England National Cricket Team'].id },
                    { teamId: teams['Australia National Cricket Team'].id }
                ] },
            formats: { create: [
                    { format: MatchFormat.TEST, matchCount: 5 }
                ] }
        },
        {
            name: 'Trans-Tasman Trophy 2022',
            description: 'Australia vs New Zealand Test Series',
            type: SeriesType.BILATERAL,
            startDate: new Date('2022-12-01'),
            endDate: new Date('2022-12-15'),
            hosts: { create: [{ countryId: countries.AUS.id }] },
            seriesTeams: { create: [
                    { teamId: teams['Australia National Cricket Team'].id },
                    { teamId: teams['New Zealand National Cricket Team'].id }
                ] },
            formats: { create: [
                    { format: MatchFormat.TEST, matchCount: 2 }
                ] }
        },
        {
            name: 'Pakistan vs South Africa ODI Series 2022',
            description: 'Pakistan vs South Africa ODI series',
            type: SeriesType.BILATERAL,
            startDate: new Date('2022-04-02'),
            endDate: new Date('2022-04-10'),
            hosts: { create: [{ countryId: countries.PAK.id }] },
            seriesTeams: { create: [
                    { teamId: teams['Pakistan National Cricket Team'].id },
                    { teamId: teams['South Africa National Cricket Team'].id }
                ] },
            formats: { create: [
                    { format: MatchFormat.ODI, matchCount: 3 }
                ] }
        },
        {
            name: 'T20 World Cup 2022',
            description: 'ICC T20 World Cup',
            type: SeriesType.LEAGUE,
            startDate: new Date('2022-10-16'),
            endDate: new Date('2022-11-13'),
            hosts: { create: [{ countryId: countries.AUS.id }] },
            seriesTeams: { create: [
                    { teamId: teams['India National Cricket Team'].id },
                    { teamId: teams['Australia National Cricket Team'].id },
                    { teamId: teams['England National Cricket Team'].id },
                    { teamId: teams['Pakistan National Cricket Team'].id },
                    { teamId: teams['South Africa National Cricket Team'].id },
                    { teamId: teams['New Zealand National Cricket Team'].id },
                    { teamId: teams['Bangladesh National Cricket Team'].id },
                    { teamId: teams['Sri Lanka National Cricket Team'].id },
                    { teamId: teams['West Indies National Cricket Team'].id },
                    { teamId: teams['Afghanistan National Cricket Team'].id }
                    // add more if needed
                ] },
            formats: { create: [
                    { format: MatchFormat.T20, matchCount: 45 }
                ] }
        },
        {
            name: 'India vs England ODI Series 2022',
            description: 'India vs England ODI series',
            type: SeriesType.BILATERAL,
            startDate: new Date('2022-07-12'),
            endDate: new Date('2022-07-17'),
            hosts: { create: [{ countryId: countries.ENG.id }] },
            seriesTeams: { create: [
                    { teamId: teams['India National Cricket Team'].id },
                    { teamId: teams['England National Cricket Team'].id }
                ] },
            formats: { create: [
                    { format: MatchFormat.ODI, matchCount: 3 }
                ] }
        }
    ];

    const seriesRecords = [];
    for (const series of seriesList) {
        seriesRecords.push(await prisma.series.create({ data: series }));
    }

    // ========== MATCH AND SQUAD CREATION STARTS HERE ==========
    const allVenues = await prisma.venue.findMany();
    const venuesByCountry: Record<string, any[]> = {};
    for (const v of allVenues) {
        if (!venuesByCountry[v.countryId]) venuesByCountry[v.countryId] = [];
        venuesByCountry[v.countryId].push(v);
    }

    for (const series of seriesRecords) {
        // Fetch full series with formats, teams, and hosts
        const dbSeries = await prisma.series.findUnique({
            where: { id: series.id },
            include: { formats: true, seriesTeams: true, hosts: true }
        });
        if (!dbSeries) continue;

        const teamIds = dbSeries.seriesTeams.map(t => t.teamId);
        if (teamIds.length < 2) continue; // need 2+ teams

        const hostVenues = dbSeries.hosts.flatMap(h => venuesByCountry[h.countryId] || []);
        if (hostVenues.length === 0) continue;

        for (const format of dbSeries.formats) {
            let matchDate = new Date(dbSeries.startDate);
            for (let i = 0; i < format.matchCount; i++) {
                const team1Id = teamIds[i % teamIds.length];
                const team2Id = teamIds[(i + 1) % teamIds.length];
                const venue = hostVenues[i % hostVenues.length];

                const match = await prisma.match.create({
                    data: {
                        seriesId: dbSeries.id,
                        seriesFormatId: format.id,
                        venueId: venue.id,
                        team1Id,
                        team2Id,
                        matchDate: new Date(matchDate),
                        format: format.format,
                        status: MatchStatus.SCHEDULED,
                    }
                });

                // (OPTIONAL) SQUAD: Add 2-3 random seeded players for each team to each match (for demo)
                // You can increase this count as needed!
                for (const tId of [team1Id, team2Id]) {
                    // Find players for this team (from your players map)
                    const teamObj: any = Object.values(teams).find((team: any) => team.id === tId);
                    if (!teamObj) continue;
                    const countryPlayers = Object.values(players).filter((p: any) => p.countryId === teamObj.countryId);
                    // Random 2-3 players (just for demo, you can use all)
                    for (let k = 0; k < Math.min(3, countryPlayers.length); k++) {
                        const player: any = countryPlayers[k];
                        await prisma.matchSquad.create({
                            data: {
                                matchId: match.id,
                                teamId: tId,
                                playerId: player.id,
                                isCaptain: k === 0, // Make first player captain
                                isWicketkeeper: player.role === PlayerRole.WICKET_KEEPER
                            }
                        });
                    }
                }

                // Move match date for next match
                matchDate.setDate(matchDate.getDate() + 2 + Math.floor(Math.random() * 4));
            }
        }
    }

    console.log('Seeded cricket data!');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
