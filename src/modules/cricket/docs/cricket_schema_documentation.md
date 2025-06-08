
# 🏏 Cricket Tournament Schema Documentation

A comprehensive overview of the Prisma schema used for managing international, domestic, and league cricket tournaments.

---

## 📊 Entity Relationship Overview

| Model                  | Related Models                            | Relation Type                       | Mandatory Fields                       | Notes                                                                 |
|------------------------|--------------------------------------------|--------------------------------------|----------------------------------------|-----------------------------------------------------------------------|
| `Country`              | Team, Player, SeriesHostCountry            | 1-to-Many                            | `code`, `name`                         | Base entity for nationality and hosting.                              |
| `Team`                 | Country, PlayerTeam, SeriesTeam, SeriesFormatTeam | Many-to-1, 1-to-Many         | `name`, `type`, `countryId` *(if INTERNATIONAL)* | Can be international (linked to Country), domestic, or league.        |
| `Player`               | Country, PlayerTeam, SeriesFormatTeamPlayer | Many-to-1, 1-to-Many          | `fullName`, `countryId`, `role`        | Created independently, but must belong to a country.                  |
| `PlayerTeam`           | Player, Team                               | Many-to-1, Many-to-1                 | `playerId`, `teamId`, `startDate`      | Links players to teams over time.                                     |
| `Series`               | SeriesHostCountry, SeriesTeam, SeriesFormat | 1-to-Many                     | `name`, `type`, `startDate`, `endDate` | Represents a tournament or league event.                              |
| `SeriesHostCountry`    | Series, Country                            | Many-to-1, Many-to-1                 | `seriesId`, `countryId`                | Defines host countries of a series.                                   |
| `SeriesTeam`           | Series, Team                               | Many-to-1, Many-to-1                 | `seriesId`, `teamId`                   | Teams participating in a series.                                      |
| `SeriesFormat`         | Series, SeriesFormatTeam                   | Many-to-1, 1-to-Many                 | `seriesId`, `format`, `matchCount`     | Defines format like Test/ODI/T20.                                     |
| `SeriesFormatTeam`     | SeriesFormat, Team, SeriesFormatTeamPlayer | Many-to-1, Many-to-1, 1-to-Many      | `seriesFormatId`, `teamId`             | A team’s participation in a specific match format.                    |
| `SeriesFormatTeamPlayer` | SeriesFormatTeam, Player               | Many-to-1, Many-to-1                 | `seriesFormatTeamId`, `playerId`       | Links players to teams within match formats.                          |

---

## 🔁 Typical Data Flow

1. **Country**: Create countries first. Required for players and some teams.
2. **Team**: Create teams, assign `countryId` if `type = INTERNATIONAL`.
3. **Player**: Create player with `countryId`. Can exist without being in a team.
4. **PlayerTeam**: Assign players to teams over time.
5. **Series**: Create a cricket event or tournament with basic metadata.
6. **SeriesHostCountry**: Link series with hosting country/countries.
7. **SeriesTeam**: Register teams playing in a series.
8. **SeriesFormat**: Define match formats (e.g., Test, ODI, T20).
9. **SeriesFormatTeam**: Assign teams to each format.
10. **SeriesFormatTeamPlayer**: Assign players to specific format-teams. Flags for captain/wicketkeeper.

---

## ✅ Mandatory Fields Summary

| Context                  | Mandatory Fields                               |
|--------------------------|------------------------------------------------|
| `Country`                | `code`, `name`                                 |
| `Team` (if INTERNATIONAL)| `countryId`, `name`, `type`                    |
| `Player`                 | `countryId`, `fullName`, `role`                |
| `PlayerTeam`             | `playerId`, `teamId`, `startDate`              |
| `Series`                 | `name`, `type`, `startDate`, `endDate`         |
| `SeriesHostCountry`      | `seriesId`, `countryId`                        |
| `SeriesTeam`             | `seriesId`, `teamId`                           |
| `SeriesFormat`           | `seriesId`, `format`, `matchCount`             |
| `SeriesFormatTeam`       | `seriesFormatId`, `teamId`                     |
| `SeriesFormatTeamPlayer` | `seriesFormatTeamId`, `playerId`              |

---

## 🗺️ Entity Relationships (Text Diagram)

```txt
Country (1) <--- (Many) Team (if international)
Country (1) <--- (Many) Player

Player (1) <--- (Many) PlayerTeam ---> (Many) Team

Series (1) <--- (Many) SeriesHostCountry ---> (Many) Country
Series (1) <--- (Many) SeriesTeam ---> (Many) Team
Series (1) <--- (Many) SeriesFormat

SeriesFormat (1) <--- (Many) SeriesFormatTeam ---> (Many) Team
SeriesFormatTeam (1) <--- (Many) SeriesFormatTeamPlayer ---> (Many) Player
```

---

## 👨‍💻 Developer Tips

- ✅ Always create `Country` entries first.
- ✅ For `Team`, check if `type = INTERNATIONAL` and assign a country.
- ✅ `Player` must belong to a country but can exist without a team initially.
- ✅ Use `PlayerTeam` for historical player-team tracking.
- ✅ A `Series` can include multiple host countries, formats, and teams.
- ✅ Match formats are linked to `Series` via `SeriesFormat`.
- ✅ Teams per format tracked with `SeriesFormatTeam`.
- ✅ Players per team per format tracked in `SeriesFormatTeamPlayer`.

---
