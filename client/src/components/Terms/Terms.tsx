import React from "react";
import { ArrowButton } from "..";
import { TermsProps } from "./Terms.props";

export const Terms = ({ show, setTerms }: TermsProps) => {
  return (
    <div className={"terms" + (show ? " terms-active" : "")}>
      <div className="terms__inner">
        <ArrowButton side={"down"} click={setTerms} />
      </div>
      <div className="terms__container">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
          voluptatibus cupiditate sequi eum itaque in, magni doloremque. Odio
          iusto cum nam cumque assumenda, reiciendis maiores, consequuntur
          consectetur, iste possimus id! Consequuntur eligendi maiores alias
          corrupti possimus repudiandae vero placeat optio, laudantium tempore
          atque sunt vitae dolorem veniam, quas non quos eum molestias
          architecto reiciendis quae corporis, expedita deleniti quis. Laborum.
          Debitis dolorum consequatur quae totam. Aliquam esse odit officiis
          labore, natus neque repellat molestias harum nobis earum consequatur
          temporibus eaque velit, reprehenderit veniam cumque unde asperiores,
          tenetur est quaerat porro! Consequatur earum dolor delectus officia
          soluta hic? Dolorem repellat perspiciatis nemo. Ipsum similique vitae,
          quod iste at animi ea eligendi nulla enim et porro iure magni
          deserunt, dolorem odit nihil. Inventore, exercitationem! Temporibus,
          quibusdam nisi possimus molestias adipisci corporis id assumenda illum
          hic libero? Veniam illum nemo facere corporis ex temporibus eveniet
          delectus deleniti facilis, voluptas est sapiente rerum earum. Corporis
          quos dolorem similique explicabo voluptatibus quisquam, at assumenda,
          esse, maiores iusto libero. At nisi delectus quisquam tempore
          accusamus odio eligendi id, velit rem. At incidunt nulla officia?
          Eius, ad! Numquam debitis amet nulla tempora, facilis deleniti ducimus
          libero iure quas? Eos, vitae rem, doloribus ad impedit magni optio
          quas libero, amet tempore sit non in nihil quos! Esse, facere. Laborum
          similique atque ipsa eveniet, saepe maxime doloribus earum qui
          repellendus incidunt expedita cumque odit ducimus aut nesciunt
          laboriosam debitis, sequi exercitationem neque tempore. Cum suscipit a
          porro eaque corrupti?
        </p>
      </div>
    </div>
  );
};
