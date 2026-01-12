import data from "@/data/skills.json";
import { skillsSchema } from "@/lib/schemas";
import { Card, CardContent } from "./ui/Card";
import Icon from "./ui/Icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/Tabs";

export default function Skills() {
  const { skills } = skillsSchema.parse(data);

  return (
    <Tabs defaultValue="software" className="w-full">
      <TabsList className="mb-4 grid w-full grid-cols-3">
        <TabsTrigger value="software" className="flex items-center gap-2">
          <Icon name="laptop" className="size-4" />
          <span>Software</span>
        </TabsTrigger>
        <TabsTrigger value="languages" className="flex items-center gap-2">
          <Icon name="languages" className="size-4" />
          <span>Languages</span>
        </TabsTrigger>
        <TabsTrigger value="expertise" className="flex items-center gap-2">
          <Icon name="award" className="size-4" />
          <span>Expertise</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="software">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {skills.software.map((skill, index) => (
            <Card key={index} className="transition-colors hover:bg-accent">
              <CardContent className="flex items-center gap-3 p-4">
                <Icon name={skill.icon} className="size-5 shrink-0" />
                <span className="font-medium">{skill.name}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="languages">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {skills.languages.map((skill, index) => (
            <Card key={index} className="transition-colors hover:bg-accent">
              <CardContent className="flex items-center gap-3 p-4">
                <Icon name={skill.icon} className="size-5 shrink-0" />
                <span className="font-medium">{skill.name}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="expertise">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {skills.expertise.map((skill, index) => (
            <Card key={index} className="transition-colors hover:bg-accent">
              <CardContent className="flex items-center gap-3 p-4">
                <Icon name={skill.icon} className="size-5 shrink-0" />
                <span className="font-medium">{skill.name}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
